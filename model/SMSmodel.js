const mongoose = require('mongoose');
const { Schema } = mongoose;

const smsReminderSchema = new Schema({
    reminderId: { type: String, required: true },
    ewaybillNumber: { type: String, required: true },
    usernmae: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    mobileNumber: { type: String, required: true },
    status: { type: String, enum: ['scheduled', 'sent', 'failed'], required: true },
});

const SMSReminders = mongoose.model('SMSReminders', smsReminderSchema);

module.exports = SMSReminders;
