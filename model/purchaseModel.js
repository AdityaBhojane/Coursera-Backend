const { Schema, model, Types } = require("mongoose");
const ObjectId = Types.ObjectId;

const purchaseSchema = new Schema({
    userId:ObjectId,
    courseId:ObjectId
});

const purchaseModel = model('purchase', purchaseSchema);

module.exports = purchaseModel;