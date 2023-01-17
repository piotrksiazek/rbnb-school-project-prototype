const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')
const uploadsFolderName = 'public/img'

router.get('/', async (req, res) => {
    res.statusCode = 200;
    db.add_offer(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0);
    res.render("add_offer");
});

router.post('/', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let image = req.files.image;
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            image.mv(`./${uploadsFolderName}/` + image.name);

            db.get_newest_offer_id_for_user(1, (id) => {
                db.add_photo(id, `/${uploadsFolderName}/${image.name}`);

                db.get_photos_synchronous(id) 
                .then((results) => {
                console.log(results);
                });
            })


            // const photos = [];
            // db.get_photos(req.session.current_new_offer_id, (link) => {photos.push(link)});

            // console.log(photos);

            res.render("add_offer");
            // //send response
            // res.send({
            //     status: true,
            //     message: 'File is uploaded',
            //     data: {
            //         name: image.name,
            //         mimetype: image.mimetype,
            //         size: image.size
            //     }
            // });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router