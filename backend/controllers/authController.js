const bcrypt = require('bcrypt');
const User = require('../models/user');
var jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ success: false, error: "All fields required" });
        }

        if(password.trim().length < 4) {
            return res.status(400).json({ success: false, error: "Password length must be at least 4 character" });
        }

        const userExist = await User.exists({ email: email.trim() });
        if(userExist) {
            return res.status(400).json({ success: false, error: "Email already registered" });
        }
        
        const hashedPassword = bcrypt.hashSync(password.trim(), 10);

        const newUser = new User({
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({
                id: user._id 
            }, process.env.SecretKey);

        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                }
            }
        })

    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email.trim() || !password.trim()) {
            return res.status(400).json({ success: false, error: "All fields required" });
        }

        if(password.trim().length < 4) {
            return res.status(400).json({ success: false, error: "Password length must be at least 4 character" });
        }

        const user = await User.findOne({ email: email.trim() });
        if(!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password.trim(), user.password);

        if(!isMatch) {
            return res.status(401).json({ success: false, error: "Wrong password" });
        }

        const token = jwt.sign({
                id: user._id
            }, process.env.SecretKey);

        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                }
            }
        })

    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

module.exports = {
    register,
    login,
}