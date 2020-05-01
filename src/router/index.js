import express from "express"

const router = express.Router()

// define routes
router.get("/", (req, res) => {
  return res.json(" Welcome to FTS 2.0")
})

export default router
