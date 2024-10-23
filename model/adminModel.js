const { Schema, model } = require("mongoose");

const adminSchema =  new Schema({
    email:{type:String, unique: true},
    password: String,
    firstName: String,
    lastName:String
});

const adminModel = model('admin',adminSchema);

module.exports = adminModel