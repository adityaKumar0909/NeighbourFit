const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');
const connectToMongoDB = require('./connection');
const requireAuth = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000

const mongoose = require('mongoose');

connectToMongoDB(process.env.MONGO_URI);

app.use(cors({
  origin: ['https://neighbourfit-frontend.onrender.com','http://localhost:5173'], // Allow requests from your React app
  credentials: true,               // Optional: for cookies if needed
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRoutes);
app.use('/admin',adminRoutes);
app.use('/dashboard',requireAuth,dashboardRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});