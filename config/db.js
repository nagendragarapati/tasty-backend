const mongoose = require('mongoose');

async function connectToDB() {
    return mongoose
        .connect('mongodb://localhost:27017/tasty')
        .then(() => console.log('DB connection successful!'));
}

module.exports = connectToDB;