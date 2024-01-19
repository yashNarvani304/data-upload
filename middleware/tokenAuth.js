const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const { log } = require("console")
// const Product = require("../model/Product.js")
var checkUser = async (req, res, next) => {
    var token
    const { authorization } = req.headers
    console.log("authorization: " + authorization)
    if (authorization) {
        try {
            token = authorization.split(' ')[1];
            // console.log(token)
            const user = jwt.decode(token);
            console.log(user)
            const userID = user.userId
            console.log(userID)
            req.user = userID
            next()
            console.log("req.user" + req.user)
        }
        catch (err) {
            console.error(err)
            res.status(500).json({ "success": false, "messege": err.messege })
        }
    }
    else if (!token) {
        res.status(404).json({ "success": false, "messege": "Unauthorized user who has not token" })
    }
}
module.exports = checkUser