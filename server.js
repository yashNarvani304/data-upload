const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const connectDatabase = require('./config/db.config.js')
const userRouter = require('./Routes/userRoutes.js')
const csvRouter = require('./Routes/csvRoutes.js')
const smsRouter = require('./Routes/smsRoutes.js')
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/api/user", userRouter, smsRouter)
app.use('/submit', csvRouter)
connectDatabase(DATABASE_URL)
app.use((err, req, res, next) => {
    console.log("hiiiii")
    console.error(err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({

        error: err.message || 'Internal Server Error',
    });
    next();
});


// const parseCSV = async () => {
//     const results = [];
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(csvFilePath)
//             .pipe(csv())
//             .on('data', (data) => results.push(data))
//             .on('end', () => resolve(results))
//             .on('error', reject);
//     });
// }

// const edit = async () => {
//     const dataBase = client.db('tasks')
//     const collection = dataBase.collection('Data-1')
//     try {
//         const data = await parseCSV();

//         // Insert the data into MongoDB
//         const result = await collection.insertMany(data);
//         console.log(`${result.insertedCount} documents inserted`);

//         // Close the MongoDB connection
//         await client.close();
//     } catch (error) {
//         console.error(error)
//     }
// }

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`)
})