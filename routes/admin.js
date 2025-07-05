const express = require('express');
const router = express.Router();
const {handleCreateNewNeighbourhood,handleGetAllNeighbourhoods,handleGetNeighbourhoodByUniqueID,handleUpdateNeighbourhoodByUniqueID,handleDeleteNeighbourhoodByUniqueID} = require('../controllers/admin');
const Neighbourhood = require('../models/neighbourhood');

//Routes

// Route to create a new neighbourhood
router.post('/',handleCreateNewNeighbourhood);
// Route to get all neighbourhoods
router.get('/',handleGetAllNeighbourhoods);
// Route to get a neighbourhood by uniqueID
router.get('/search/:uniqueID', handleGetNeighbourhoodByUniqueID);
//Route to update a neighbourhood data by uniqueID
router.patch('/neighbourhood-update/:uniqueID', handleUpdateNeighbourhoodByUniqueID);
// Route to delete a neighbourhood by uniqueID
router.delete('/delete-neighbourhood/:uniqueID',handleDeleteNeighbourhoodByUniqueID);

module.exports = router;