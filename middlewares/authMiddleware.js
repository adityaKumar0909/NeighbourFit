const express = require("express");
const {getUser} = require('../services/auth');

async function requireAuth(req,res,next){
console.log("Incoming cookies:", req.cookies);
console.log("Access received:", req.cookies?.uid);
console.log("Refresh recieved: ",req.cookies?.refresh)


    const userID= req.cookies?.uid;
    if(!userID){
        //REDIRECT TO REFRESH TOKEN 
        return res.status(400).json({mssg:"No token provided"})
    }

    const user = await getUser(userID);
    if (!user) {
        //REDIRECT TO LOGIN
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    // console.log("Added user in the req body");
    console.log("Giving access to dashboard API")
    next();
}

module.exports = requireAuth
