import app from "@src/app"
import { createHttpTerminator } from "http-terminator"

const NODE_ENV = process.env.NODE_ENV

const port = process.env.PORT
const host = process.env.HOST

const server = app.listen(port, (error, success) => {
  if (error) {
    console.error(`could not start the app ${err}`)
    return
  }
  console.log(`FTS server is running at port ${host}:${port}`)
})

if (NODE_ENV === "production") {
  const httpTerminator = createHttpTerminator({ server })
  setTimeout(() => {
    httpTerminator.terminate()
  }, 1000)
}
