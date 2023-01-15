exports.home = (req, res) => {
    res.render('home');
}

// app pages

exports.offer_preview = (req, res) => {
    res.render('offer_preview');
}

exports.search_results = (req, res) => {
    res.render('search_results');
}

exports.confirmation = (req, res) => {
    res.render('confirmation');
}

exports.confirmation_sent = (req, res) => {
    res.render('confirmation_sent');
}

exports.contact = (req, res) => {
    res.render('contact');
}

exports.contact_sent = (req, res) => {
    res.render('contact_sent');
}

exports.report = (req, res) => {
    res.render('report');
}

exports.report_sent = (req, res) => {
    res.render('report_sent');
}

exports.reservations = (req, res) => {
    res.render('reservations');
}

exports.accommodation_report = (req, res) => {
    res.render('accommodation_report');
}

exports.accommodation_report_sent = (req, res) => {
    res.render('accommodation_report_sent');
}

exports.my_offers = (req, res) => {
    res.render('my_offers');
}

exports.offer_deleted = (req, res) => {
    res.render('offer_deleted');
}

// forms
/* ... */


// login - registration

exports.login = (req, res) => {
    res.render('login');
}

exports.registration = (req, res) => {
    res.render('registration');
}

exports.account_created = (req, res) => {
    res.render('account_created');
}


// errors

exports.notFound = (req, res) => {
    res.render('404');
}

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    res.render('500');
}
/* eslint-enable no-unused-vars */


exports.account = (req, res) => {
    res.render('account');
}