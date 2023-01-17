const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')

router.get("/", (req, res) => {
  res.statusCode = 200
  res.render("registration")
})

router.get("/error", (req, res) => {
  res.render("registration_error")
})

router.post('/', (req, res) => {
  let pass = req.body.password
  let passR = req.body.passwordR
  if (pass !== passR){
    res.redirect("/registration/error")
  }
  db.add_user(req.body.mail, req.body.password, req.body.phoneNumber, req.body.firstname, req.body.surname)
  res.statusCode = 201
  res.render("account_created")
})

module.exports = router