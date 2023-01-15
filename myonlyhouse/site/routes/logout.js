const express = require('express');

const router = express.Router();
const db = require('../dbsqlite3');

router.get('/', (req, res) => {
	req.session.destroy();
	res.send('Pomyslnie wylogowano');
});

module.exports = router;
