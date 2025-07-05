const mongoose = require('mongoose');
const Neighbourhood = require('../models/neighbourhood');
const {nanoid} = require('nanoid');


async function handleCreateNewNeighbourhood(req,res){

    const body = req.body;
    //validating body
    if(!body.name || !body.description || !body.rent || !body.greenery || !body.safety || !body.nightlife || !body.budgetFriendly || !body.studentFriendly || !body.bachelorFriendly || !body.publicTransport || !body.foodAccessibility || !body.cleanliness || !body.city){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    const uniqueID = nanoid(7);

    try{
        await Neighbourhood.create({
            ...body,
            uniqueID: uniqueID
        });

        return res.status(201).json({message:"Neighbourhood created successfully",neighbourhoodID: uniqueID});

    }catch(err){
        return res.status(500).json({message:err.message});
    }


};

async function handleGetAllNeighbourhoods(req,res){
     try{
        const neighbourthoods = await Neighbourhood.find({});
        return res.status(200).json(neighbourthoods);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

async function handleGetNeighbourhoodByUniqueID(req, res) {
    const uniqueID = req.params.uniqueID;
    if(!uniqueID){
        return res.status(400).json({message: "Please provide a uniqueID"});
    }
    try{
        const neighbourhood = await Neighbourhood.findOne({uniqueID: uniqueID});
        if(!neighbourhood){
            return res.status(404).json({message: "Neighbourhood not found"});
        }
        return res.status(200).json(neighbourhood);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

async function handleUpdateNeighbourhoodByUniqueID(req, res) {
    const uniqueID = req.params.uniqueID;
    const updateData = req.body;

    try{
        const update = await Neighbourhood.findOneAndUpdate(
            {uniqueID: uniqueID},
            updateData,
            {new:true}
        )
        if(!update){
            return res.status(404).json({message: "Neighbourhood not found"});
        }
        return res.status(200).json({message: "Neighbourhood updated successfully", neighbourhood: update});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

async function handleDeleteNeighbourhoodByUniqueID(req, res) {
    const uniqueID = req.params.uniqueID;
    if(!uniqueID){
        return res.status(400).json({message: "Please provide a uniqueID"});
    }
    try{
        const deletedNeighbourhood = await Neighbourhood.findOneAndDelete({uniqueID: uniqueID});
        if(!deletedNeighbourhood){
            return res.status(404).json({message: "Neighbourhood not found"});
        }
        return res.status(200).json({message: "Neighbourhood deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    handleCreateNewNeighbourhood,
    handleGetAllNeighbourhoods,
    handleGetNeighbourhoodByUniqueID,
    handleUpdateNeighbourhoodByUniqueID,
    handleDeleteNeighbourhoodByUniqueID
}