/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	if (req.session.user_id) {
		console.log('CONFIRMATION');

		const offerArray = { ...req.session.offer };
		const offerDataArray = { ...req.session.offerData };

		// req.session.offer = null;
		// req.session.offerData = null;

		console.log(offerArray);
		console.log(offerDataArray);

		const { price } = req.session;
		const servicePrice = req.session.service_price;
		const totalPrice = parseInt(price, 10) + parseInt(servicePrice, 10);

		res.render('confirmation', {
			offerArray,
			offerDataArray,
			price,
			servicePrice,
			totalPrice,
		});
	} else {
		req.session.previous = '/confirmation';
		res.redirect('/login');
	}
});

module.exports = router;
