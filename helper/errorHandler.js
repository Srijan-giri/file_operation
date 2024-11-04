const express = require('express');
const multer = require('multer');

const fileHandleError = async (err, req, res, next) => {
    console.log(err);

    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send("File too large.Max size is 3kb");
        }
        // Handle other Multer-specific errors (e.g., invalid file types)
        else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).send("Invalid file extension");
        }

        return res.status(400).send(err.message);
    }
    else {
        console.error("Error:", err);
        res.status(500).send('Something went wrong.');
    }

}

module.exports = { fileHandleError };