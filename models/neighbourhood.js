const mongoose = require('mongoose');

const neighbourhoodSchema = new mongoose.Schema({
    uniqueID:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    rent:{
        type:Number,
        required:true,
    },
    greenery:{
        type:Number,
        required:true,
    },
    safety:{
        type:Number,
        required:true,
    },
    nightlife:{
        type:Number,
        required:true,
    },
    budgetFriendly:{
        type:Number,
        required:true,
    },
    studentFriendly:{
        type:Number,
        required:true,
    },
    bachelorFriendly:{
        type:Number,
        required:true,
    },
    publicTransport:{
        type:Number,
        required:true,
    },
    foodAccessibility:{
        type:Number,
        required:true,
    },
    cleanliness:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true
    }
});

const Neighbourhood = mongoose.model('neighbourhood', neighbourhoodSchema);

module.exports = Neighbourhood;