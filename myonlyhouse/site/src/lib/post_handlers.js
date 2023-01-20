const database = require('../../dbsqlite3');

exports.home = (req, res) => {
	try {
		let opcje = {
			parking: 0,
			internet: 0,
			curfew: 0,
			toilet: 0,
			animals: 0,
			balcony: 0,
			tv: 0,
			tarrace: 0
		};

		if(req.body.parking == 'on') opcje.parking = 1;
		if(req.body.zwierzeta == 'on') opcje.animals = 1;
		if(req.body.internet == 'on') opcje.internet = 1;
		if(req.body.balkon == 'on') opcje.balcony = 1;
		if(req.body.cisza_nocna == 'on') opcje.curfew = 1;
		if(req.body.telewizja == 'on') opcje.tv = 1;
		if(req.body.lazienka == 'on') opcje.toilet = 1;
		if(req.body.taras == 'on') opcje.tarrace = 1;

		let offers = database.list_offers(0, 10, req.body.lokalizacja_mieszkania, parseInt(req.body.cena_za_dobe_od), parseInt(req.body.cena_za_dobe_do), opcje.parking, opcje.internet, opcje.curfew,
			opcje.toilet, opcje.animals, opcje.balcony, opcje.tv, opcje.tarrace);

		req.session.offer = [];

		for(let i = 0; i < offers.length; i++)
		{
			let offer = database.get_offer(offers[i].offer_id);

			req.session.offer.push({
				id: offer.offer_id,
				path: 'path',
				house_name: offer.title,
				price: offer.price + ' zł',
				location: offer.address,
				review: offer.stars + ' gwiazdki'
			});
		}

		res.redirect('/search_results');
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.offer_preview = (req, res) => {
	try {
		console.log('req body: ');
		console.log(req.body);

		// saving data about reservation price and period
		req.session.offer = {
			price: req.session.offerData.price, // '111',
			startDate: req.body.startDate,
			endDate: req.body.endDate,
		};

		// ! POBIERZ TE DANE Z BAZY DANYCH
		//
		req.session.price = req.session.offerData.price;
		req.session.service_price = '50';

		res.redirect('/confirmation');
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.confirmation = (req, res) => {
	try {
		database.add_reservation(req.session.offerData.id, req.session.user_id, req.session.offer.startDate, req.session.offer.endDate);
		req.session.offer = null;
		req.session.offerData = null;

		res.redirect('/confirmation_sent');
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};