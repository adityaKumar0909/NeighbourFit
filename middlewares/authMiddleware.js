const express = require("express");
const { getUser, handleRefreshTokens } = require('../services/auth');

async function requireAuth(req, res, next) {
    try {
        const accessToken = req.cookies?.uid;
        
        if (!accessToken) {
            if (req.cookies?.refresh) {
                return res.status(401).json({
                    message: "Access token missing",
                    shouldRefresh: true
                });
            }
            return res.status(401).json({ message: "Authentication required . Please login !" });
        }

        const user = await getUser(accessToken);
        
        if (!user) {
            if (req.cookies?.refresh) {
                return res.status(401).json({
                    message: "Access token expired",
                    shouldRefresh: true
                });
            }
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: "Authentication failed" });
    }
}

module.exports = requireAuth;