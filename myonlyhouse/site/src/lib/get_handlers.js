/* eslint-disable node/no-unsupported-features/es-syntax */
exports.home = (req, res) => {
	res.render('home');
};

// app pages

exports.offer_preview = (req, res) => {
	console.log(`offer id: ${req.params.id}`);

	// pobranie danych o ofercie z bazy na podstawie id
	// ...
	const offerData = {
		short_description: 'desc',
		address: 'add 1',
		price: '111',
		parking: '1',
		zwierzeta: '1',
		internet: '1',
		balkon: '1',
		cisza_nocna: '1',
		telewizja: '1',
		lazienka: '1',
		taras: '1',
		stars: '4', // liczba całkowita
	};

	const comments = [
		{
			nick: 'nick1',
			comment: 'comment1',
		},
		{
			nick: 'nick2',
			comment: 'comment2',
		},
	];

	req.session.offerData = offerData;

	const takenStars = 5 - offerData.stars;
	res.render('offer_preview', { offerData, comments, takenStars });
};

exports.search_results = (req, res) => {
	console.log('search results session: ');
	console.log(req.session.offer);
	const offerArray = { ...req.session.offer };

	req.session.offer = null;

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
	res.render('reservations');
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
	res.render('my_offers');
};

exports.offer_deleted = (req, res) => {
	res.render('offer_deleted');
};

exports.registration = (req, res) => {
	res.render('registration');
};

exports.account_created = (req, res) => {
	res.render('account_created');
};
