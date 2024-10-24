const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email:{type:String, unique: true},
    password: String,
    firstName: String,
    lastName:String
});


const userModel = model("user",userSchema);

module.exports = userModel