const SMSmodel = require("../model/SMSmodel")
const { v4: uuidv4 } = require('uuid');
const createSMSReminder = async (req, res) => {
    try {
        const { ewaybillNumber, scheduledDate, mobileNumber } = req.body;

        // Validate input data
        console.log(ewaybillNumber)
        if (!ewaybillNumber || !scheduledDate || !mobileNumber) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        function generateUniqueReminderId() {
            return uuidv4(); // Generate a random UUID
        }
        // Create a new SMS reminder document
        const smsReminder = new SMSmodel({
            reminderId: generateUniqueReminderId(),
            ewaybillNumber,
            usernmae: req.user.name, // Assuming user information is available in the request
            scheduledDate,
            mobileNumber,
            status: 'scheduled',
        });

        // Save the SMS reminder document to the database
        await smsReminder.save();

        res.status(201).json({ message: 'SMS reminder set successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const readSMS = async (req, res) => {
    const { reminderId } = req.params
    const smsReminder = await SMSmodel.findOne({ reminderId: reminderId })
    if (!smsReminder) {
        return res.status(404).json({ message: 'No SMS reminder found' })
    }
    res.status(200).json({ "message": 'SMS reminder set successfully', message: smsReminder })

};

const readbyUsername = async (req, res) => {
    const { username } = req.body
    const smsReminder = await SMSmodel.find({ username: username})
    if (!smsReminder) {
        return res.status(404).json({ message: 'No SMS reminder found' })
    }
    res.status(200).json({ "message": 'SMS reminder set successfully', message: smsReminder })
};


module.exports = { createSMSReminder, readSMS }