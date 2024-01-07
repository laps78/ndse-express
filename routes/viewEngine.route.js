const express = require("express")
const router = express.Router

const viewEngine = (req, res, next) => {
  console.log("viewEngine")
  next()
}

router.use("/", viewEngine)

module.exports = router
