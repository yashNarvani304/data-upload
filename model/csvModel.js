const mongoose = require('mongoose');
const { Schema } = mongoose;

const csvData = new Schema({
    eWaybilldata: { type: String, unique: true },
    status: { type: String },
    userId: { type: String },
    uploadDate: { type: Date, default: Date.now() },
    bulkuploadId: { type: String, unique: true },
});

const csvSchema = mongoose.model("csvData", csvData);
module.exports = csvSchema;
