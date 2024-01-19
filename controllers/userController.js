const userModel = require('../model/userModel.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
// var emailRegex = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
var nameRegex = /^[A-Za-z\s'-]+$/
var numRegex = /^[0]?[789]\d{9}$/
const userRegistration = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPassword } = req.body;
        const user = await userModel.find({ $or: [{ name: name }, { email: email }, { mobile: mobile }] })
        console.log(user)
        if (user && user.length > 0) {

            return res.send({ message: "already registered" })
        }
        else {
            console.log("user")
            if (name && email && password && confirmPassword && mobile) {
                if (!email.match(emailRegex)) {
                    return res.status(400).json({ message: 'Invalid email format' });
                }
                else if (!name.match(nameRegex)) {
                    return res.send({ "status": "failed", "message": "Invalid Name format" });
                }
                else if (!numRegex.test(mobile)) {
                    return res.status(400).json({ message: "Invalid Mobile format" });
                }
                if (password === confirmPassword) {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const doc = new userModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                        mobile: mobile
                    })

                    // console.log("docs:", doc);
                    await doc.save()
                    //generate jwt token

                    const saved_user = await userModel.findOne({ email: email })
                    const token = jwt.sign({ userID: saved_user }, process.env.JWT_SECRET_KEY, { expiresIn: '5h' })
                    res.send({ "status": "success", "message": "registration compelete", 'token': token })
                }
                else {
                    res.send({ "status": "failed", "message": "dosent match password" })
                }
            }
            else {
                res.send({ "status": "failed", "message": "plz fill required these fields" })
            }
        }
    }
    catch (error) {
        console.log(error)
        // res.send({ "status": "failed", "message": "Unable to registration" })
        if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(400).json({ message: 'Email already registered' });
        } else if (error.code === 11000 && error.keyPattern.mobile === 1) {
            res.status(400).json({ message: 'Mobile number already registered' });
        } else if (error.code === 11000 && error.keyPattern.name === 1) {
            res.status(400).json({ message: 'Name already registered' });
        } else {
            res.status(500).json({ message: 'Registration failed' });
        }
    }
}

//user login----------------------------------------------------------------
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ $or: [{ email: username }, { mobile: username }, { name: username }] })

        if (user !== null) {
            const imatch = await bcrypt.compare(password, user.password)
            if (imatch) {
                const token = jwt.sign({ userID: user}, process.env.JWT_SECRET_KEY, { expiresIn: '5h' })
                res.status(200).json({ "status": "success", "message": "Login successful", "token": token })
                // res.sendFile(path.join(__dirname, 'views', '../views/fileUpload.html'))
            }
            else {
                res.status(403).json({ "success": false, "message": "username or password incorrect plz check and try again" })
            }
        }
        else {
            res.status(404).json({ "success": false, "message": "You are not registered plz registrer ur account first or try agian latter" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "success": false, "message": "Internal server error plz try after some time" })
    }
}

module.exports = {
    userRegistration, userLogin
}