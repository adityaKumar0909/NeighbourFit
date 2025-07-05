const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB(url){
    mongoose.connect(process.env.MONGO_URI,{
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((err) => {
        console.error('MongoDB connection error:', err);
    })
}

module.exports = connectToMongoDB
