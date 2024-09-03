const express = require("express");
const {
    createNewUser, 
    getCurrentUser,
     verifyUserAccount,
} = require("../controller/userController");
const requireSignin = require("../middlewares/requireSignin");
const userRouter =express.Router();

userRouter.post("/", createNewUser);   
userRouter.post("/", createNewUser);
userRouter.get("/me", requireSignin, getCurrentUser);
userRouter.put("/verify", verifyUserAccount);
module.exports = userRouter;