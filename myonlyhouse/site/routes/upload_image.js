const express = require('express')
const router = express.Router()
const db = require('../dbsqlite3')
const uploadsFolderName = 'uploads'

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