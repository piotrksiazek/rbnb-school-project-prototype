const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myonlyhouse.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        console.error("Failed to create/open DB file. " + err);
    else
        console.log("Successfully created/opened DB file.");

    init_database();
});

function init_database() {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        );`);

    db.run(`CREATE TABLE IF NOT EXISTS Offers (
        offer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        price INTEGER NOT NULL,
        parking INTEGER NOT NULL,
        internet INTEGER NOT NULL,
        curfew INTEGER NOT NULL,
        toilet INTEGER NOT NULL,
        animals INTEGER NOT NULL,
        balcony INTEGER NOT NULL,
        tv INTEGER NOT NULL,
        tarrace INTEGER NOT NULL,
        finished INTEGER DEFAULT 0 NOT NULL
        );`);

    db.run(`CREATE TABLE IF NOT EXISTS Reservations (
        offer_id INTEGER NOT NULL,
        reserving_user_id INTEGER NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL
        );`);

    db.run(`CREATE TABLE IF NOT EXISTS Photos (
        offer_id INTEGER NOT NULL,
        link TEXT NOT NULL
        );`);

    console.log("Initialized database");
}

function add_user(login, password) {
    db.run(`INSERT OR IGNORE INTO Users VALUES (NULL, ?, ?)`, [login, password], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

function delete_user(id) {
    db.run(`DELETE FROM Users WHERE user_id = ?`, [id], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

// callback(exists);
function check_login(login, password, callback) {
    db.all(`SELECT * FROM Users WHERE login = ? and password = ?`, [login, password], (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        callback(rows.length > 0);
    });
}

function add_offer(user_id, price, parking, internet, curfew, toilet, animals, balcony, tv, tarrace, finished) {
    db.run(`INSERT INTO Offers VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user_id, price, parking, internet, curfew, toilet, animals, balcony, tv, tarrace, finished], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

// callback(user_id, price, parking, internet, curfew, toilet, animals, balcony, tv, tarrace)
function get_offer(id, callback) {
    db.each(`SELECT * FROM Offers WHERE offer_id = ?`, [id], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.user_id, row.price, row.parking, row.internet, row.curfew, row.toilet, row.animals, row.balcony, row.tv, row.tarrace);
    });
}

function get_newest_offer_id_for_user(userId, callback) {
    db.each(`SELECT MAX(offer_id) as id FROM Offers WHERE user_id = ?`, [userId], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.id);
    });
}

function delete_offer(id) {
    db.run(`DELETE FROM Offers WHERE offer_id = ?`, [id], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

// callback(offer_id) for each offer
function list_offers(starting_id, amount) {
    db.each(`SELECT offer_id FROM Offers WHERE offer_id > ? LIMIT ?`, [starting_id, amount], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.offer_id);
    });
}

function add_reservation(offer_id, reserving_user_id, start_date, end_date) {
    db.run(`INSERT INTO Reservations VALUES (?, ?, ?, ?)`, [offer_id, reserving_user_id, start_date, end_date], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

function delete_reservation(offer_id, reserving_user_id, start_date, end_date) {
    db.run(`DELETE FROM Offers WHERE offer_id = ? and reserving_user_id = ? and start_date = ? and end_date = ?`, [offer_id, reserving_user_id, start_date, end_date], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

// callback(offer_id) for each offer
function get_user_offers(user_id, callback) {
    db.each(`SELECT * FROM Offers WHERE user_id = ?`, [user_id], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.offer_id);
    });
}

// callback(offer_id, start_date, end_date)
function get_user_reservations(user_id, callback) {
    db.each(`SELECT * FROM Offers NATURAL JOIN Reservations WHERE reserving_user_id = ?`, [user_id], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.offer_id, row.start_date, row.end_date);
    });
}

function add_photo(offer_id, link)
{
    db.run(`INSERT INTO Photos VALUES (?, ?)`, [offer_id, link], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

function delete_photo(offer_id, link) {
    db.run(`DELETE FROM Photos WHERE offer_id = ? and link = ?`, [offer_id, link], (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

// callback(link) for each photo
function get_photos(offer_id, callback) {
    db.each(`SELECT link FROM Photos NATURAL JOIN Offers WHERE offer_id = ?`, [offer_id], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.link);
    });
}

// callback(start_date, end_date) for each reservation date
function get_offer_reservation_dates(offer_id, callback) {
    db.each(`SELECT * FROM Reservations NATURAL JOIN Offers WHERE offer_id = ?`, [offer_id], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        callback(row.start_date, row.end_date);
    });
}

module.exports = { init_database, add_user, check_login, delete_user, add_offer, get_offer, delete_offer, list_offers, add_reservation,
    delete_reservation, get_user_offers, get_user_reservations, add_photo, delete_photo, get_photos, get_offer_reservation_dates, get_newest_offer_id_for_user };
