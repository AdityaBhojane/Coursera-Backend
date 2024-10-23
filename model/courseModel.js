const { Schema, model, Types } = require("mongoose");
const ObjectId = Types.ObjectId;

const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});


const courseModel = model('course',courseSchema);

module.exports = courseModel