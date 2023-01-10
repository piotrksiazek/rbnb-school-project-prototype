const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');


const handlers = require('./src/lib/handlers');

const { credentials } = require('./src/config');

const app = express();



// handlebars configuration
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// body parser configuration
app.use(bodyParser.json());

// cookie-parser secret set
app.use(cookieParser(credentials.cookieSecret));

// express-session init
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));


const port = process.env.PORT || 3000;



// main websites
app.get('/', handlers.home);
app.get('/search_results', handlers.search_results);
app.get('/offer_preview', handlers.offer_preview);
app.get('/confirmation', handlers.confirmation);
app.get('/confirmation_sent', handlers.confirmation_sent);
app.get('/contact', handlers.contact);
app.get('contact_sent', handlers.contact_sent)
app.get('/report', handlers.report);
app.get('/report_sent', handlers.report_sent);
app.get('/reservations', handlers.reservations);
app.get('/accommodation_report', handlers.accommodation_report);
app.get('/reservations', handlers.reservations);
app.get('/accommodation_report_sent', handlers.accommodation_report_sent);
app.get('/offer_deleted', handlers.offer_deleted);

// login - registration
app.get('/login', handlers.login);
app.get('/registration', handlers.registration);
app.get('/account_created ', handlers.account_created );


// process forms
/* ... */

// strona 404
app.use(handlers.notFound);

// strona 500
app.use(handlers.serverError);


if (require.main === module) {
    app.listen(port, () => console.log(
        `Express started at http://localhost:${port}; ` +
        'Press Ctrl-C in order to stop.'
    ));
}
else {
    module.exports = app;
}

