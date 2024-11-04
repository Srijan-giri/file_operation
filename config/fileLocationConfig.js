const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');


function fileFilter(req, file, cb) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("'Invalid file type. Only PNG, JPEG, JPG, and PDF files are allowed.'"), false);
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // return cb(null, 'uploads/req.session.user.id/')
        const fileDir = path.join('uploads', req.session.user.id.toString());

        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        return cb(null, fileDir);

    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        const uuid = uuidv4();
        return cb(null, `${Date.now()}${fileName}${uuid}.${extension}`);
    }
});

const maxSize = 150 * 1024; //(150 kb)

const upload = multer({ storage: storage, limits: { fileSize: maxSize }, fileFilter: fileFilter });

module.exports = { upload };