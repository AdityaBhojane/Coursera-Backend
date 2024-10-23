const { default: mongoose } = require("mongoose");
require('dotenv').config();

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL)
        console.log("connected to db")
    } catch (error) {
        console.log("Error" + error.message);
        process.exit(1); // exit the process if there is an error
    }
}

module.exports = connectDB;