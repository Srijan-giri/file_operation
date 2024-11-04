const express = require('express');
const app = require('./app');
const db = require('./models/index');


const port = process.env.DB_PORT || 8000;


db.sequelize.sync().then(()=>{
    console.log("Database synced");
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
}).catch((err)=>{
    console.log('Error syncing database:', err);
})


