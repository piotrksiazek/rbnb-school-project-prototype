const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')

router.get("/", (req, res) => {
    res.statusCode = 200
    res.render("login")
})

router.post('/', (req, res) => {
    db.check_login(req.body.login, req.body.haslo, ((input) => {
        if (input) {  // logowanie pomyslne
            req.session.user_id = req.body.login
            if (req.session.previous){
                res.statusCode = 200
                res.redirect(req.session.previous)
            } else {
                res.statusCode = 200
                res.redirect('/')
            }
        } else {
            res.send("Nieprawidlowa nazwa uzytkownika lub haslo")
        }
    }))
})

module.exports = router