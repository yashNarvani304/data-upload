const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const csvController = require('../controllers/csvController.js');
const checkUser = require('../middleware/tokenAuth.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" folder
router.use(express.static("public"));


// Multer file upload setup
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('csvFile');
const upload = multer({ storage: storage }).single('csvFile');


// const upload = multer({ storage: storage });
router.use('/submit-csv', checkUser)
// CSV Data Submission
router.post('/submit-csv', csvController.fileUploader);
router.get('/get-data', checkUser, csvController.getData);
router.get('/get-csv/:bulkuploadId', checkUser, csvController.getBulkUpload);
module.exports = router;
