const express = require('express')
const router = express()
const userController = require('../controllers/userController.js')
// const checkUser = require('../middleware/tokenAuth.js')
//middleware
// router.use('/login', checkUser)

//public Routes
router.post('/register', userController.userRegistration)/**registartion**/
router.post('/login', userController.userLogin)/**login**/

module.exports = router