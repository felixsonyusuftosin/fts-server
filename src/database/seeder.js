import couch from "@src/database/couchDb"
import tables from "@src/database/databaseTable.json"
import Nano from "@src/database/nano"
import people from "@src/database/data/people.json"
import history from "@src/database/data/history.json"
import lga from "@src/database/data/lga"
import state from "@src/database/data/state"
import tracking from "@src/database/data/tracking"
import cases from "@src/database/data/cases"

const NODE_ENV = process.env.NODE_ENV

const createTables = async () => {
  const createdTables = Object.keys(tables).map(async (table) => {
    try {
      await couch.createDatabase(table)
      console.log(`created table ${table} `)
      return true
    } catch (error) {
      console.log(`error creating table ${table}: ${error}`)
      return false
    }
  })

  const allResolved = await Promise.all(createdTables)
  if (false in allResolved) {
    console.log(
      "reversing the command to create all tables and rollong back ..."
    )
    await dropAllTables()
    console.log("could not create all DBs")
    return false
  }
  console.log(`\ncreated all tables successfully`)
  return
}

const dropAllTables = async () => {
  if (NODE_ENV === "production") {
    console.log(
      "!!!WARNING \nyou can not automatically drop all production tables , if you want to do this head on the admin portal and manually delete the tables\n "
    )
    return
  }

  const droppedTables = Object.keys(tables).map(async (table) => {
    try {
      await couch.dropDatabase(table)
      console.log(`dropped table ${table} `)
      return true
    } catch (error) {
      console.log(`error dropping table ${table}`)
      return false
    }
  })

  const allResolved = await Promise.all(droppedTables)
  if (false in allResolved) {
    throw new Error("could not drop all DBs")
  }
  console.log(`\ndropped all tables successfully......`)
  return
}

const dropOneTable = async (table) => {
  if (NODE_ENV === "production") {
    console.log(
      "!!!WARNING \nyou can not automatically drop any production tables , if you want to do this head on the admin portal and manually delete the tables\n "
    )
    return
  }
  try {
    await couch.dropDatabase(table)
    console.log(`dropped table ${table} successfully`)
    return
  } catch (error) {
    console.log(`error dropping table ${table}`)
  }
}

const seedPeople = async () => {
  const db = Nano.db.use("people")
  const updatedPeople = people.map((person) => {
    person._id = person.personId.toString()
    return person
  })

  try {
    const inserted = await db.bulk({ docs: updatedPeople })
    if (!inserted) {
      console.error("could not insert data")
    }
  } catch (err) {
    console.error(`could not upload peaple: ${err}`)
  }
}

const seedHistory = async () => {
  const db = Nano.db.use("history")
  const updatedHistory = history.map((history) => {
    history._id = history.historyId.toString()
    return history
  })

  try {
    const inserted = await db.bulk({ docs: updatedHistory })
    if (!inserted) {
      console.error("could not insert data")
    }
  } catch (err) {
    console.error(`could not upload peaple: ${err}`)
  }
}
const seedLga = async () => {
  const db = Nano.db.use("lga")
  const updatedLga = lga.map((lga) => {
    lga._id = lga.lgaId.toString()
    return lga
  })

  try {
    const inserted = await db.bulk({ docs: updatedLga })
    if (!inserted) {
      console.error("could not insert data")
    }
  } catch (err) {
    console.error(`could not upload peaple: ${err}`)
  }
}
const seedState = async () => {
  const db = Nano.db.use("state")
  const updatedState = state.map((state) => {
    state._id = state.stateId.toString()
    return state
  })

  try {
    const inserted = await db.bulk({ docs: updatedState })
    if (!inserted) {
      console.error("could not insert data")
    }
  } catch (err) {
    console.error(`could not upload peaple: ${err}`)
  }
}

const seedTracking = async () => {
  const db = Nano.db.use("tracking")
  const updatedTracking = tracking.map((tracking) => {
    tracking._id = tracking.trackingId.toString()
    return tracking
  })

  try {
    const inserted = await db.bulk({ docs: updatedTracking })
    if (!inserted) {
      console.error("could not insert data")
    }
  } catch (err) {
    console.error(`could not upload peaple: ${err}`)
  }
}

const seedCases = async () => {
  const db = Nano.db.use("cases")
  const updatedCases = cases.map((cased) => {
    cased._id = cased.caseId.toString()
    return cased
  })
  
  try {
    const inserted = await db.bulk({ docs: updatedCases })
    if (!inserted) {
      console.error("could not insert data")
    }
  } catch (err) {
    console.error(`could not upload peaple: ${err}`)
  }
}

const seedAll = async () => {
  try {
    console.log(`\nSeeding into people database ....`)
    await seedPeople()
    console.log(`\nSeeded into people database ....`)
    console.log(`\nSeeding into cases database ....`)
    await seedCases()
    console.log(`\nSeeded into cases database ....`)
    console.log(`\nSeeding into tracking database ....`)
    await seedTracking()
    console.log(`\nSeeded into tracking database ....`)
    console.log(`\nSeeding into state database ....`)
    await seedState()
    console.log(`\nSeeded into state database ....`)
    console.log(`\nSeeding into lga database ....`)
    await seedLga()
    console.log(`\nSeeded into lga database ....`)
    console.log(`\nSeeding into history database ....`)
    await seedHistory()
    console.log(`\nSeeded into history database ....`)
    console.log(`\nSeeding complete....`)
    return true
  } catch (err) {
    console.log(`error seeding : ${err}`)
  }
}

module.exports = {
  createTables,
  dropAllTables,
  dropOneTable,
  seedAll
}
