const express = require("express")
const router = express.Router()

router.get("/", (rew, res) => {
  res.render("index", {
    title: 'Главная'
  })
})

module.exports = router
