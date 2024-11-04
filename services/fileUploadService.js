const { FileService } = require('../models');

const fileUploadService = async (filename, original_file_name, size) => {
    try {
        await FileService.create({
            filename: filename,
            original_file_name: original_file_name,
            size: size
        });
        return true;
    }
    catch (err) {
        console.log("File data is not uploaded successfully");
    }
}

module.exports = { fileUploadService };