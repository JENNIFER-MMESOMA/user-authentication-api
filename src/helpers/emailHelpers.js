const transport= require("./smtpTransport");
const {EMAIL_USER} = require("../config/index")

const sendOtpToUser =(otp, email) => {

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "OTP verirification",
        html: `<h1> Your OTP ${otp}</h1>`,
    
    };

    transport.sendMail(mailOptions, (error)=>{
        if (error){
            console.log(error);
        } else {
            console.log("error sent successfully")
        }
    });
};

// send password reset token to user as email 
const sendPasswordResetTokenToUser = (otp, email) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "password reset OTP",
        html: `<h1> Your OTP is ${otp}</h1>`,
    };
    transport.sendMail(mailOptions, (error)=>{
        if (error) {
            console.log(error);
        } else {
            console.log("email sent successfully")
        }
    });
};
module.exports = {sendOtpToUser, sendPasswordResetTokenToUser};