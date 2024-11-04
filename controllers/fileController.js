const multer = require('multer');
const { fileUploadService } = require('../services/fileUploadService');



const fileUploadController = async (req, res) => {
    try {
        console.log("Image uploaded successfully");
        console.log(req.file);

        const fileName = req.file.filename;
        const size = req.file.size;
        const original_file_name = req.file.originalname;

        const isSaved = await fileUploadService(fileName, original_file_name, size);

        if (isSaved) {
            console.log("Image uploaded successfully");
        }

        console.log(req.session.user.totalFileUpload);
        req.session.user.totalFileUpload++;

        res.redirect('/file');
    }
    catch (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.send("File size exceed")
            }
            else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                res.send("file extension not matched");
            }
        }

        console.log("Error:" + err)
        res.status(500).send("Error uploading file: " + err.message);
    }
}
module.exports = { fileUploadController };