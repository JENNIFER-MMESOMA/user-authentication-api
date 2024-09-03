const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateOTP = require("../helpers/randomCodeGenerator");
const { sendOtpToUser } = require("../helpers/emailHelpers");

//create new user controller function
const createNewUser = async (req, res) => {
  //destructure user info from request body
  const { email, password } = req.body;
  try {
    //check if user with email already exists
    //this is to ensure that a user with the same email does not exist on the database
    const userExist = await User.findOne({ email });
    //return error response if user already exists
    if (userExist) {
      return res.status(403).json({ error: "User already exists" });
    }
    // hash (Encrypt) user password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //generate random otp
    const verificationToken = generateOTP();

    //create a new instance of user from User model
    const newUser = new User({
      email,
      password: hashedPassword,
      verificationToken,
    });
    //save user data on database
    await newUser.save();
    // check if user info fails to save on the database
    if (!newUser) {
      return res.status(400).json({ error: "User creation failed" });
    }

    //send generated otp to user as email
    sendOtpToUser(newUser.verificationToken, newUser.email);
    //return success response if operation is successful
    return res.status(201).json({ message: "User created successful" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//verify user account
const verifyUserAccount = async (req, res) => {
  try {
    const { verificationToken } = req.body;

    //check for user with verification token
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //verify user account
    //change verification status from false to true
    user.isVerified = true;
    //delete verification token from user object
    user.verificationToken = undefined;

    //save user object
    await user.save();

    return res.status(200).json({ message: "user verification successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get current user
const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ error: "userfound", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { createNewUser, getCurrentUser, verifyUserAccount };