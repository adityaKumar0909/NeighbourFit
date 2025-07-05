const express = require('express');
const router = express.Router();
const {handleFetchDashboard,handleGetAllNeighbourhoodsByCity,handleGetTop3Neighbourhood} = require('../controllers/dashboard');


router.get('/',handleFetchDashboard);
router.get('/neighbourhoods',handleGetAllNeighbourhoodsByCity);
router.post('/topThreeWebsites',handleGetTop3Neighbourhood);

module.exports = router