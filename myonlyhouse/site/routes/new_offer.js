const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')
const uploadsFolderName = 'uploads'

router.get('/', async (req, res) => {
    res.statusCode = 200;
    db.add_offer(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0);
    db.get_newest_offer_id_for_user(1, (id) => req.session.current_new_offer_id = id);
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
            db.add_photo()

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: image.name,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router