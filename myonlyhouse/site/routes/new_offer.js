const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')
const uploadsFolderName = 'public/img'

router.get('/', async (req, res) => {
    res.statusCode = 200;
    db.add_offer(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, Math.round(Math.random() * 5), 0);
    res.render("add_offer");
});

router.post('/accept', (req, res) => {
    console.log('accept');
    const login = req.session.user_id;
    const {name, price, price_per_person, max_guests, street, city, building_number,
        apartment_number, number_of_levels, sq_meters, kitchen, parking, internet, curfew, toilet,
        animals, balcony, tv, tarrace, finished} = req.body;
    console.log(req.body);

    const userId = db.get_user_id_by_login_no_callback(login).id;
    console.log(userId);

    const offerId = db.get_newest_offer_id_for_user(userId).id;
    console.log(offerId);

    db.update_offer(userId, name, price, price_per_person, max_guests, street, city, building_number, apartment_number, number_of_levels,
        sq_meters, kitchen, parking, internet, curfew, toilet, animals, balcony, tv, tarrace, finished, offerId);
    
    res.render("added_offer");
    });


router.post('/', (req, res) => {
    let image = req.files.image;

    const login = req.session.user_id;
    const userId = db.get_user_id_by_login_no_callback(login).id;
  
    const imageName = image.md5;
    const imageExtension = image.name.split(".")[1];
    image.mv(`./${uploadsFolderName}/${imageName}.${imageExtension}`);

    const offerId = db.get_newest_offer_id_for_user(userId).id;
    console.log(db.get_newest_offer_id_for_user(userId));
    db.add_photo(offerId, `/${uploadsFolderName}/${imageName}.${imageExtension}`);
    console.log(offerId);

    const photos = db.get_photos2(offerId);
    const photosArr = []

    for (var photo in photos) {
        photosArr.push(photo.link);
      }
    console.log(photos);
    res.render("add_offer", {links: photos});

});

module.exports = router