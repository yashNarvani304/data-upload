const mongoose = require('mongoose');

const connectDatabase = async (DATABASE_URL) => {
    try {
        const db = {
            dbName: "tasks"
        }
        await mongoose.connect(DATABASE_URL, db);
        console.log("Connected to database")
    } catch (error) {
        console.error(error);
    }
}
module.exports = connectDatabase