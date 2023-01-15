const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multiparty = require('multiparty');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('./dbsqlite3');

const getHandlers = require('./src/lib/get_handlers');

const { credentials } = require('./src/config');

const app = express();

// handlebars configuration
app.set('view engine', 'handlebars');
app.engine(
	'handlebars',
	expressHandlebars.engine({
		defaultLayout: 'main',
		layoutsDir: `${__dirname}/views/layouts`,
		partialsDir: `${__dirname}/views/partials`,
	})
);

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// cookie-parser secret set
app.use(cookieParser(credentials.cookieSecret));

// express-session init
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: credentials.cookieSecret,
	})
);

const port = process.env.PORT || 3000;

// main websites
app.get('/', getHandlers.home);
app.get('/search_results', getHandlers.search_results);
app.get('/offer_preview/:id', getHandlers.offer_preview);
app.get('/confirmation', getHandlers.confirmation);
app.get('/confirmation_sent', getHandlers.confirmation_sent);
app.get('/contact', getHandlers.contact);
app.get('contact_sent', getHandlers.contact_sent);
app.get('/report', getHandlers.report);
app.get('/report_sent', getHandlers.report_sent);
app.get('/reservations', getHandlers.reservations);
app.get('/accommodation_report', getHandlers.accommodation_report);
app.get('/reservations', getHandlers.reservations);
app.get('/accommodation_report_sent', getHandlers.accommodation_report_sent);
app.get('/offer_deleted', getHandlers.offer_deleted);

// login - registration
app.get('/login', getHandlers.login);
app.get('/registration', getHandlers.registration);
app.get('/account_created ', getHandlers.account_created);

// process forms
app.post('/home', (req, res) => {
	try {
		console.log('req body: ');
		console.log(req.body);
		// gdy się uda
		// wyszukujemy w bazie danych wyniki mieszkań
		// zawierają one dane do wyświetlenia: "search_results"

		// przechowujemy je w sesji
		req.session.offer = [
			{
				id: '14',
				path: 'path1',
				house_name: 'name1',
				price: 'price1',
				location: 'loc1',
				review: 'rev1',
			},
		];

		res.redirect('/search_results');
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
});

// ERRORS
const notFound = (req, res) => {
	res.render('404');
};

const serverError = (err, req, res, next) => {
	res.render('500');
};

// strona 404
app.use(notFound);
// strona 500
app.use(serverError);

if (require.main === module) {
	app.listen(port, () =>
		console.log(
			`Express started at http://localhost:${port}; ` +
				'Press Ctrl-C in order to stop.'
		)
	);
} else {
	module.exports = app;
}
