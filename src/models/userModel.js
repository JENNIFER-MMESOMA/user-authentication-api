const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  isVerified:{type: Boolean, defult: false},
  verificationToken:{type:String, unique: true},
  passwordResetToken:{type:String, unique: true},
  password: { 
    type: String,
     required: true },
}, 
{timestamps: true}
);
const User = mongoose.model("user", userSchema)
module.exports = User;