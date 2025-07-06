const User = require('../models/user');
const {sendOtpEmail} = require('../utils/sendEmail');
const sendEmail = require('../utils/sendEmail');
const {setUser} = require('../services/auth');
const bcrypt = require('bcrypt');
const {getUser} = require('../services/auth')
require('dotenv').config();


async function handleSignup(req,res){

    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    const name  = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    try{
        await User.create({
             name,
             email,
             password,
             otp,
             isVerified: false
            });

        await sendEmail(email,
        "Verify your account ","Your OTP is: ",otp);
        return res.status(201).json({message:"OTP sent to your email.Please verify your account."});
    }
    catch(err){
            return res.status(500).json({message:err.message});
    }
}

async function handleVerifyOTP(req,res){
    if(!req.body.email || !req.body.otp) {
        return res.status(400).json({message:"Please provide email and OTP"});
    }

    const{email,otp} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if(user.otp !==otp){
        return res.status(400).json({ message: "Invalid OTP" });
    }
    user.ifVerified = true;
    user.otp = null; // Clear the OTP after verification
    await user.save();

    return res.status(200).json({ message: "Account verified successfully!" });

}

async function handleResetPassword(req,res){

    if(!req.body.email){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();
    try{
        await sendEmail(email,
            "Reset your password","Your OTP is: ",otp);
        return res.status(200).json({message:"OTP sent to your email.Please verify your account."});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function handleResetPasswordVerifyOTP(req, res) {
    const { email, newPassword, otp } = req.body;

    if (!email || !newPassword || !otp) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.ifVerified = true;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (err) {
        console.error("Reset OTP error:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function handleLogin(req,res){
    const isProd = true;

    const body = req.body;
    if(!body.email || !body.password){ 
        return res.status(400).json({message:"Email or password missing from request"});
    }
    const {email , password} = body;

    const user = await User.findOne({email:email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    if (!user.ifVerified) {
        return res.status(400).json({ message: "Please verify your email first" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:"Wrong password"});
    }

    const {accessToken,refreshToken} = await setUser(user);
    res.cookie("uid", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 60 * 60 * 1000  // 1 hour
    });

     res.cookie("refresh", refreshToken, {
        httpOnly: true,
         secure: isProd,
         sameSite: isProd ? "none" : "lax",
        maxAge: 7*24*60 * 60 * 1000  // 7 days
    });


    return res.status(200).json({ message: "Login successful"});

}

async function handleAuthUser(req,res){

    try{
        const accessToken = req.cookies?.uid;

        if(!accessToken){
            if(req.cookies.refresh){
                return res.status(200).json({
                    message:"User logged in"
                });
            }
            return res.status(400).json({message:"Auth required ! Log in again"})
        }

        const user = await getUser(accessToken);
        if (!user) {
        return res.status(401).json({ message: "Invalid token" });
         }

        return res.status(200).json({ loggedIn: true, user });
        
    }
    catch(error){
        console.error("Authentication error :",error);
        return res.status(500).json({message:"Authentication failed"});
    }

}

async function handleLogOut(req,res){

    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("uid",{
         httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax"
    });
    res.clearCookie("refresh", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax"
    });

    return res.status(200).json({ message: "Logged out" });
}



module.exports = {handleSignup, handleVerifyOTP,handleResetPassword,handleResetPasswordVerifyOTP,handleLogin,handleAuthUser,handleLogOut};