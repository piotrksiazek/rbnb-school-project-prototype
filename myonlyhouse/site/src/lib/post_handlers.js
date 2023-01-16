exports.home = (req, res) => {
	try {
		console.log('req body: ');
		console.log(req.body);

		// gdy się uda
		// wyszukujemy w bazie danych wyniki mieszkań na podstawie danych z request body
		// zawierają one dane do wyświetlenia: "search_results". Przechowywujemy je w sesji

		// przechowujemy je w sesji
		req.session.offer = [
			{
				// data for displaying single search_results row
				id: '1',
				path: 'path1',
				house_name: 'name1',
				price: 'price1',
				location: 'loc1',
				review: 'rev1',
			},
			{
				id: '2',
				path: 'path2',
				house_name: 'name2',
				price: 'price2',
				location: 'loc2',
				review: 'rev2',
			},
		];

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
			price: '111',
			startDate: req.body.startDate,
			endDate: req.body.endDate,
		};

		// ! POBIERZ TE DANE Z BAZY DANYCH
		//
		req.session.price = '200';
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
		// zapis w bazie rezerwację dla danego uzytkownika
		// id uzytkownika: req.session.user_id
		// id rezerwacji trzeba znaleźć na bazie danych z req.session.offerData
		// daty rezerwacji znajdują się w: req.session.offer
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