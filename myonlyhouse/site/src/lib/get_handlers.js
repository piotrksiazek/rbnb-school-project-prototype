const database = require('../../dbsqlite3');

/* eslint-disable node/no-unsupported-features/es-syntax */
exports.home = (req, res) => {
	res.render('home');
};

// app pages

exports.offer_preview = (req, res) => {
	let id = req.params.id.substring(3);
	const dbData = database.get_offer(id);
	const photos = database.get_photos(id);

	const offerData = {
		id: id,
		short_description: dbData.name,
		address: dbData.address,
		price: dbData.price,
		parking: dbData.parking,
		zwierzeta: dbData.animals,
		internet: dbData.internet,
		balkon: dbData.balcony,
		cisza_nocna: dbData.curfew,
		telewizja: dbData.tv,
		lazienka: dbData.toilet,
		taras: dbData.tarrace,
		stars: dbData.stars,
		big_link: photos[0].link,
		links: []
	};

	for(let i = 0; i < photos.length; i++) {
		offerData.links.push({link: photos[i].link});
	}

	console.log(offerData);

	const dbComments = database.get_comments(id);
	const comments = [];

	for (let i = 0; i < dbComments.length; i++) {
		comments.push({ nick: dbComments[i].nick, comment: dbComments[i].msg });
	}

	req.session.offerData = offerData;

	const takenStars = 5 - offerData.stars;
	res.render('offer_preview', { offerData, comments, takenStars });
};

exports.search_results = (req, res) => {
	const offerArray = { ...req.session.offer };

	// req.session.offer = null;

	res.render('search_results', { offer: offerArray });
};

exports.confirmation_sent = (req, res) => {
	res.render('confirmation_sent');
};

exports.contact = (req, res) => {
	res.render('contact');
};

exports.contact_sent = (req, res) => {
	res.render('contact_sent');
};

exports.report = (req, res) => {
	res.render('report');
};

exports.report_sent = (req, res) => {
	res.render('report_sent');
};

exports.reservations = (req, res) => {
	const reserv = database.get_user_reservations(req.session.user_id);

	const myOffers = []
	
	for(let i = 0; i < reserv.length; i++)
	{
		const photos = database.get_photos(reserv[i].offer_id);
		myOffers.push({
			imgPath: photos[0].link,
			title: reserv[i].name,
			address: reserv[i].address,
		})
	};

	res.render('reservations', {myOffers: myOffers});
};

exports.add_ofer = (req, res) => {
	res.render('add_offer');
};

exports.accommodation_report = (req, res) => {
	res.render('accommodation_report');
};

exports.accommodation_report_sent = (req, res) => {
	res.render('accommodation_report_sent');
};

exports.my_offers = (req, res) => {
	const user = database.get_user_from_login(req.session.user_id);
	const offers = database.get_user_offers(user.user_id)

	const myOffers = [];
	for(let i = 0; i < offers.length; i++)
	{
		const photos = database.get_photos(offers[i].offer_id);
		const user = database.get_user(offers[i].user_id);

		myOffers.push({
			interior_1: photos[0].link,
			name: offers[i].name,
			address: offers[i].address,
			phone_number: user.phone_number,
			offer_id: offers[i].offer_id,
		});
	}

	res.render('my_offers', { offers: myOffers });
};

exports.offer_deleted = (req, res) => {
	res.render('offer_deleted');
};

exports.offer_added = (req, res) => {
	res.render('offer_added');
}

exports.registration = (req, res) => {
	res.render('registration');
};

exports.account_created = (req, res) => {
	res.render('account_created');
};

exports.password_reminder = (req, res) => {
	res.render('password_reminder');
};

exports.password_reminder_sent = (req, res) => {
	res.render('password_reminder_sent');
};

exports.review = (req, res) => {
	res.render('review');
};

exports.review_sent = (req, res) => {
	res.render('review_sent');
};
