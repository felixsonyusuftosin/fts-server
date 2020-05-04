import Nano from '@databse/nano'

const db = nano.use('lga')

export const getLgaById = async lgaid => {
  const lga = await db.get(String(lgaId))
  if(!lga) {
    return { success: false,  error: 'Could Not find LGA'}
  }
  return lga
}

