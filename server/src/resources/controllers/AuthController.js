const Users = require("../models/UserModel");
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    status: "failure",
                    msg: "Please check field username and password!"
                })
            }

            const user = await Users.findOne({ username });
            if (user) {
                return res.status(400).json({
                    status: "failure",
                    msg: "Username Already! Please check username again!"
                })
            }

            const hashPassword = await argon2.hash(password);

            const newAccount = new Users({
                username,
                password: hashPassword
            });

            await newAccount.save();

           return   res.status(200).json({
                status: "success",
                msg: "Register account success",
                newAccount
            })
        } catch (error) {
           return res.status(404).json({
                status: "failure",
                msg: error
            })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(401).json({
                    status: "failure",
                    msg: "Please check field username and password!"
                })
            }

            const user = await Users.findOne({ username });
           
            if (!user) {
                return res.status(401).json({
                    status: "failure",
                    msg: "User not found"
                })
            };

            const passwordVerify = await argon2.verify(user.password, password);

            if (!passwordVerify) {
                return res.status(401).json({
                    status: "failure",
                    msg: "Password not vertify!"
                })
            }

            const accessToken = jwt.sign({
                userID: user._id
            }, process.env.ACCESS_TOKEN_SECRET);

            return res.status(200).json({
                status: "success",
                msg: "Login successfully",
                accessToken
            })
        } catch (error) {
           return  res.status(404).json({
                status: "failure",
                msg: error
            })
        }
    }

    async checkUser(req, res) {
        try {
            const user = await Users.findById({_id: req.userID}).select('-password');
            if(!user) return res.status(400).json({status: failure, msg: 'User not found'});

            return res.status(200).json({status: 'success', user});
        } catch (error) {
            return res.status(404).json({
                status: 'failure',
                msg: error
            })
        }
    }
}

module.exports = new AuthController;