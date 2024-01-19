const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    // confirmPassword:{type:String, required:true}
})
user.index({ name: 1 }, { unique: true });
user.index({ email: 1 }, { unique: true });
user.index({ mobile: 1 }, { unique: true });
// user.index({ name: 1, email: 1, mobile: 1 }, { unique: true });

const userSchema = mongoose.model("User", user)
module.exports = userSchema