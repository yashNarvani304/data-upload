const express = require('express');
const smsReminder = require('../controllers/smsReminder');
const checkUser = require('../middleware/tokenAuth');
const router = express.Router();

//smsReminder
router.post('/sms-reminder', checkUser, smsReminder.createSMSReminder)
router.get('/sms-get/:reminderId', checkUser, smsReminder.readSMS)

module.exports = router
