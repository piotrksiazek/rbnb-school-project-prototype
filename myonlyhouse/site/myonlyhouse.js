const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multiparty = require('multiparty');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const database = require('./dbsqlite3');

const accountRouter = require('./routes/account'); // session debug
const loginRouter = require('./routes/login');
const confirmationRouter = require('./routes/confirmation');
const logoutRouter = require('./routes/logout');
const database = require('./dbsqlite3');
const fileUpload = require('express-fileupload');
// const sqlite = require("better-sqlite3")
// const SqliteStore = require("better-sqlite3-session-store")(expressSession)
// const sessionDB = new sqlite("./session1.db")

const accountRouter = require('./routes/account')  // session debug
const loginRouter = require('./routes/login')
const confirmationRouter = require('./routes/confirmation')
const logoutRouter = require('./routes/logout')
const uploadImageRouter = require('./routes/upload_image')

const getHandlers = require('./src/lib/get_handlers');
const postHandlers = require('./src/lib/post_handlers');

const { credentials } = require('./src/config');
const { Database } = require('sqlite3');

const app = express();

// handlebars configuration
app.set('view engine', 'handlebars');
app.engine(
	'handlebars',
	expressHandlebars.engine({
		defaultLayout: 'unlogged',
		layoutsDir: `${__dirname}/views/layouts`,
		partialsDir: `${__dirname}/views/partials`,
		// eslint-disable-next-line global-require
		helpers: require('./handlebars_helpers'),
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
	expressSession({
		// name: "session1",
		secret: 'tajnehaslo1',
		resave: false,
		saveUninitialized: true,
		// store: new SqliteStore({
		// 	client: sessionDB,
		// }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 1 day (1 day * 24h * 60min * 60sec
			// secure: true
		},
	})
);

// parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname))
app.use(cookieParser())
app.use(fileUpload({
    createParentPath: true
}));

// header swap middleware
const checkForHeader = function (req, res, next) {
	if (req.session.user_id) {
		app.engine(
			'handlebars',
			expressHandlebars.engine({
				defaultLayout: 'loggedIn',
			})
		);
	} else {
		app.engine(
			'handlebars',
			expressHandlebars.engine({
				defaultLayout: 'unlogged',
			})
		);
	}
	next();
};
app.use(checkForHeader);

// routers
app.use('/account', accountRouter)
app.use('/login', loginRouter)
app.use('/confirmation', confirmationRouter)
app.use('/logout', logoutRouter)
app.use('/upload_image', uploadImageRouter)

// main websites
app.get('/', getHandlers.home);
app.get('/search_results', getHandlers.search_results);
app.get('/offer_preview/:id', getHandlers.offer_preview);
app.get('/confirmation_sent', getHandlers.confirmation_sent);
app.get('/contact', getHandlers.contact);
app.get('contact_sent', getHandlers.contact_sent);
app.get('/report', getHandlers.report);
app.get('/report_sent', getHandlers.report_sent);
app.get('/reservations', getHandlers.reservations);
app.get('/accommodation_report', getHandlers.accommodation_report);
app.get('/accommodation_report_sent', getHandlers.accommodation_report_sent);
app.get('/offer_deleted', getHandlers.offer_deleted);
app.get('/add_offer', getHandlers.add_ofer);

// app.get('/password_reminder', handlers.password_reminder);
// app.get('/password_reminder_sent', handlers.password_reminder_sent);
// app.get('/offer_added', handlers.offer_added);
// app.get('/add_offer', handlers.add_offer);

app.get('/registration', getHandlers.registration);
app.get('/account_created ', getHandlers.account_created);

// main websites forms
app.post('/home', postHandlers.home);
app.post('/offer_preview', postHandlers.offer_preview);
app.post('/confirmation', postHandlers.confirmation);

// ERRORS
const notFound = (req, res) => {
	res.render('404');
};

const serverError = (err, req, res, next) => {
	res.render('500');
};

app.use(notFound); // strona 404
app.use(serverError); // strona 500

// SERVER
const port = process.env.PORT || 3000;

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
