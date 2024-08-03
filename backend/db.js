const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mynotebook';

const connectToMongo = async() => {
    await mongoose.connect(uri);
    console.log("Connected to mongoose successfully");
}

module.exports = connectToMongo;