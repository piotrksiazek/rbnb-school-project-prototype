const database = require('../../dbsqlite3');

exports.home = (req, res) => {
	req.session.offer = null;
	try {
		let opcje = {
			parking: 0,
			internet: 0,
			curfew: 0,
			toilet: 0,
			animals: 0,
			balcony: 0,
			tv: 0,
			tarrace: 0,
		};

		if (req.body.parking == 'on') opcje.parking = 1;
		if (req.body.zwierzeta == 'on') opcje.animals = 1;
		if (req.body.internet == 'on') opcje.internet = 1;
		if (req.body.balkon == 'on') opcje.balcony = 1;
		if (req.body.cisza_nocna == 'on') opcje.curfew = 1;
		if (req.body.telewizja == 'on') opcje.tv = 1;
		if (req.body.lazienka == 'on') opcje.toilet = 1;
		if (req.body.taras == 'on') opcje.tarrace = 1;

		let main_props = {
			localization: '%',
			price_from: 0,
			price_to: 999999,
		}

		if (req.body.lokalizacja_mieszkania != ""){
				main_props.localization = '%' + req.body.lokalizacja_mieszkania.trim().split(" ")[0] + '%'
		}
		if (req.body.cena_za_dobe_od != ""){
				main_props.price_from = parseInt(req.body.cena_za_dobe_od)
		}
		if (req.body.cena_za_dobe_do != ""){
			main_props.price_to = parseInt(req.body.cena_za_dobe_do)
		}

		let offers = database.list_offers(
			0,
			50,
			main_props.localization,
			main_props.price_from,
			main_props.price_to,
			opcje.parking,
			opcje.internet,
			opcje.curfew,
			opcje.toilet,
			opcje.animals,
			opcje.balcony,
			opcje.tv,
			opcje.tarrace
		);

		req.session.offer = [];


		if(req.body.zameldowanie != '' || req.body.wymeldowanie != ''){
			if ((req.body.zameldowanie != "") && (req.body.wymeldowanie == "")){
				var date_from = new Date(req.body.zameldowanie)
				var date_to = new Date(req.body.zameldowanie)
			} else if((req.body.zameldowanie == "") && (req.body.wymeldowanie != "")){
				var date_from = new Date(req.body.wymeldowanie)
				var date_to = new Date(req.body.wymeldowanie)
			} else {
				var date_from = new Date(req.body.zameldowanie)
				var date_to = new Date(req.body.wymeldowanie)
			}

			for(let i = 0; i < offers.length; i++){
				let db_dates = database.check_reservation_date(offers[i].offer_id)
				for (let reservation of db_dates){
					if(reservation != undefined){
						let reservation_date_from = new Date(reservation.start_date)
						let reservation_date_to = new Date(reservation.end_date)
						reservation_date_to.setDate(reservation_date_to.getDate() - 1)
						if ((date_from > reservation_date_from && date_from < reservation_date_to) || (date_to > reservation_date_from && date_to < reservation_date_to)){
							offers.splice(i, 1)
						}
					}
				}
			}
		}


		for (let i = 0; i < offers.length; i++) {
			let offer = database.get_offer(offers[i].offer_id);
			let photos = database.get_photos(offers[i].offer_id);
			let stars_str = ""
			for (let j = 0; j < offer.stars; j++){
				stars_str = stars_str + "★"
			}

			req.session.offer.push({
				id: offer.offer_id,
				path: photos[0].link,
				house_name: offer.name,
				price: offer.price + ' zł',
				location: offer.city,
				review: stars_str,
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
		database.add_reservation(
			req.session.offerData.id,
			req.session.user_id,
			req.session.offer.startDate,
			req.session.offer.endDate
		);
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

exports.accommodation_report = (req, res) => {
	res.redirect('/accommodation_report_sent');
};

exports.review = (req, res) => {
	res.redirect('/review_sent');
};

exports.my_offers = (req, res) => {
	console.log(req.body.offer_id);

	database.delete_offer(req.body.offer_id);

	res.redirect('back');
};
