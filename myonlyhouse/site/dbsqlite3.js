const sqlite3 = require('better-sqlite3');

const db = new sqlite3('./myonlyhouse.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        console.error("Failed to create/open DB file. " + err);
    else
        console.log("Successfully created/opened DB file.");
});

init_database();

function init_database() {
    db.exec(`CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone_number TEXT,
        first_name TEXT,
        surname TEXT
        );`);

        db.exec(`CREATE TABLE IF NOT EXISTS Offers (
            offer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            price_per_person INTEGER NOT NULL,
            max_guests INTEGER NOT NULL,
            street TEXT NOT NULL,
            city TEXT NOT NULL,
            building_number INTEGER NOT NULL,
            apartment_number INTEGER NOT NULL,
            number_of_levels INTEGER NOT NULL,
            sq_meters INTEGER NOT NULL,
            kitchen INTEGER NOT NULL,
            parking INTEGER NOT NULL,
            internet INTEGER NOT NULL,
            curfew INTEGER NOT NULL,
            toilet INTEGER NOT NULL,
            animals INTEGER NOT NULL,
            balcony INTEGER NOT NULL,
            tv INTEGER NOT NULL,
            tarrace INTEGER NOT NULL,
            stars INTEGER NULL,
            finished INTEGER DEFAULT 0 NOT NULL,
            desc TEXT NOT NULL
            );`);

    db.exec(`CREATE TABLE IF NOT EXISTS Reservations (
        offer_id INTEGER NOT NULL,
        reserving_user_id INTEGER NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL
        );`);

    db.exec(`CREATE TABLE IF NOT EXISTS Photos (
        offer_id INTEGER NOT NULL,
        link TEXT NOT NULL
        );`);

    db.exec(`CREATE TABLE IF NOT EXISTS Comments (
        offer_id INTEGER NOT NULL,
        nick TEXT NOT NULL,
        msg TEXT NOT NULL
        );`);

    console.log("Initialized database");
}

function add_user(login, password, phone_number, first_name, surname) {
    db.prepare(`INSERT OR IGNORE INTO Users VALUES (NULL, ?, ?, ?, ?, ?)`).run(login, password, phone_number, first_name, surname);
}

function delete_user(id) {
    db.prepare(`DELETE FROM Users WHERE user_id = ?`).run(id);
}

// Returns if correct
function check_login(login, password) {
    return db.prepare(`SELECT * FROM Users WHERE login = ? and password = ?`).bind(login, password).get() != null;
}

function get_user_from_login(login) {
    return db.prepare(`SELECT * FROM Users WHERE login = ?`).bind(login).get();
}

function get_user_id_by_login_no_callback(login) {
    return db.prepare(`SELECT user_id as id FROM Users WHERE login = ?`).bind(login).get();
};

function add_offer(user_id, name, price, price_per_person, max_guests, street, city, building_number,
    apartment_number, number_of_levels, sq_meters, kitchen, parking, internet, curfew, toilet,
    animals, balcony, tv, tarrace, stars, finished, desc) {
db.prepare(`INSERT INTO Offers VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run( 
   user_id, name, price, price_per_person, max_guests, street, city, building_number,
    apartment_number, number_of_levels, sq_meters, kitchen, parking, internet, curfew, toilet,
    animals, balcony, tv, tarrace, stars, finished, desc);
}

function get_offer(id) {
    return db.prepare(`SELECT * FROM Offers WHERE offer_id = ?`).bind(id).get();
}

function get_newest_offer_id_for_user(userId) {
    return db.prepare(`SELECT MAX(offer_id) as id FROM Offers WHERE user_id = ?`).get(userId);
}

function delete_offer(id) {
    db.prepare(`DELETE FROM Offers WHERE offer_id = ?`).run(id);
}

function update_offer(user_id, name, price, price_per_person, max_guests, street, city, building_number,
    apartment_number, number_of_levels, sq_meters, kitchen, parking, internet, curfew, toilet,
    animals, balcony, tv, tarrace, finished, offer_id) {
    db.prepare(`UPDATE Offers
            SET user_id = ?,
                name = ?,
                price = ?,
                price_per_person = ?,
                max_guests = ?,
                street = ?,
                city = ?,
                building_number = ?,
                apartment_number = ?,
                number_of_levels = ?,
                sq_meters = ?,
                kitchen = ?,
                parking = ?,
                internet = ?,
                curfew = ?,
                toilet = ?,
                animals = ?,
                balcony = ?,
                tv = ?,
                tarrace = ?,
                finished = ?
            WHERE offer_id = ?`).run(user_id, name, price, price_per_person, max_guests, street, city, building_number,
                apartment_number, number_of_levels, sq_meters, kitchen, parking, internet, curfew, toilet,
                animals, balcony, tv, tarrace, finished, offer_id);
}


function list_offers(starting_id, amount, address, start_price, end_price, parking, internet, curfew, toilet, animals, balcony, tv, tarrace) {
    return db.prepare(`SELECT offer_id FROM Offers WHERE offer_id >= ? AND address = ? AND price >= ? AND price <= ? AND parking >= ? AND internet >= ? AND curfew >= ? AND toilet >= ? AND animals >= ? AND balcony >= ? AND tv >= ? AND tarrace >= ? LIMIT ?`).bind(starting_id, address, start_price, end_price, parking, internet, curfew, toilet, animals, balcony, tv, tarrace, amount).all();
}

function add_reservation(offer_id, reserving_user_id, start_date, end_date) {
    db.prepare(`INSERT INTO Reservations VALUES (?, ?, ?, ?)`).run(offer_id, reserving_user_id, start_date, end_date);
}

function delete_reservation(offer_id, reserving_user_id, start_date, end_date) {
    db.prepare(`DELETE FROM Offers WHERE offer_id = ? and reserving_user_id = ? and start_date = ? and end_date = ?`).run(offer_id, reserving_user_id, start_date, end_date);
}

// callback(offer_id) for each offer
function get_user_offers(user_id) {
    return db.prepare(`SELECT * FROM Offers WHERE user_id = ?`).run(user_id);
}

// callback(offer_id, start_date, end_date)
function get_user_reservations(user_id) {
    return db.prepare(`SELECT * FROM Offers NATURAL JOIN Reservations WHERE reserving_user_id = ?`).bind(user_id).all();
}

function add_photo(offer_id, link) {
    db.prepare(`INSERT INTO Photos VALUES (?, ?)`).run(offer_id, link);
}

function delete_photo(offer_id, link) {
    db.prepare(`DELETE FROM Photos WHERE offer_id = ? and link = ?`).run(offer_id, link);
}

// callback(link) for each photo
function get_photos(offer_id) {
    return db.prepare(`SELECT link FROM Photos NATURAL JOIN Offers WHERE offer_id = ?`).all(offer_id);
}

// callback(start_date, end_date) for each reservation date
function get_offer_reservation_dates(offer_id) {
    return db.prepare(`SELECT * FROM Reservations NATURAL JOIN Offers WHERE offer_id = ?`).bind(offer_id).all();
}

function get_comments(offer_id) {
    return db.prepare(`SELECT * FROM Comments WHERE offer_id = ?`).bind(offer_id).all();
}

function add_comment(offer_id, nick, msg) {
    db.prepare(`INSERT INTO Comments VALUES (?, ?, ?)`).run(offer_id, nick, msg);
}

module.exports = { init_database, add_user, check_login, delete_user, add_offer, get_offer, delete_offer, list_offers, add_reservation,
    delete_reservation, get_user_offers, get_user_reservations, add_photo, delete_photo, get_photos, get_offer_reservation_dates, get_newest_offer_id_for_user, get_comments, add_comment, get_user_from_login, get_user_id_by_login_no_callback, update_offer };
