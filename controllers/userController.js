const User = require('../models/userModel')
const userValidations = require("../utils/userUtils")
const jwt = require("jsonwebtoken");
const cartController=require("./cartControllers")

let token

exports.signUp = async (req, res) => {
    try {
        const userData = req.body;
        const { email } = userData;
        const validateuserData = userValidations.validateUserData(userData);
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error("User already exists with this email");
        }

        if (validateuserData.isValid) {
            const user = await User.create(userData);
            await cartController.createCart(user);

            const payload = {
                userId: user._id,
            };
            const token = jwt.sign(payload, "MY_SECRET_TOKEN");
            return res.status(201).send({
                token,
                message: "SignUp Success"
            });
        } else {
            return res.status(400).send({
                message: validateuserData.statusMsg,
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err.message,
        });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("user not found with this email, Please signUp");
        }
        else {
            if (password !== user.password) {
                res.status(400).json(
                    {
                        status: "fail",
                        message: "Password didn't match"
                    }
                )
            }
            else {
                const payload = {
                    userId: user._id,
                };
                token = jwt.sign(payload, "MY_SECRET_TOKEN");
                res.send({
                    token, message: "Login Success"
                });

            }

        }
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })

    }
}



exports.getUserDetails = async (req, res) => {
    try {
        const base64Url = token.split('.')[1];
        const decodedValue = Buffer.from(base64Url, 'base64').toString('utf-8');
        const decodedData = JSON.parse(decodedValue);
        const userId = decodedData.userId

        const user = await User.findOne({ _id:userId })
        if (user) {
            res.status(200).json({
                data: user
            })
        }
        else {
            res.status(404)
            res.send({
                message: "User not found"
            })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}