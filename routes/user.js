const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {handleSignup, handleVerifyOTP,handleResetPassword,handleResetPasswordVerifyOTP,handleLogin} = require('../controllers/user');
const { handleRefreshTokens } = require('../services/auth');

//Routes related to signup
router.post('/signup',handleSignup);
router.post('/verify-otp',handleVerifyOTP);

//Routes related to Reset-Password
router.post('/reset-password',handleResetPassword);
router.post('/reset-password-verify',handleResetPasswordVerifyOTP)

//Routes related to login
router.post('/login',handleLogin);

//Router related to JWT tokens
router.post('/refresh-tokens',handleRefreshTokens);


module.exports = router;


