const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')

router.get('/', (req, res) => {
    let session = req.session
    if (session.user_id){
        res.statusCode = 200
        res.render("confirmation")
    } else {
        req.session.previous = "/confirmation"
        res.redirect("/login")
    }
})

module.exports = router