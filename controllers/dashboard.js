const Neighbourhood = require('../models/neighbourhood');

async function handleFetchDashboard(req,res){
    return res.status(200).json({mssg:"On the main page"});
}

async function handleGetAllNeighbourhoodsByCity(req,res){

    try{
    const city = req.query.city;
    if(!city){
        return res.status(400).json({mssg:"No params sent"});
    }
    const data = await Neighbourhood.find({city});

    return res.status(200).json({data});
    }
    catch(err){
        return res.status(500).json({mssg:"Failed to fetch neighbourhood data "});
    }
    
}

async function handleGetTop3Neighbourhood(req, res) {
    try {
        const { city, preferences, top = [] } = req.body;

        if (!city || !preferences || typeof preferences !== 'object') {
            return res.status(400).json({ message: 'Missing or invalid input data' });
        }

        const allZones = await Neighbourhood.find({ city });

        if (!allZones || allZones.length === 0) {
            return res.status(404).json({ message: 'No neighbourhoods found for the given city' });
        }

        const scored = allZones.map((n) => {
            let score = 0;

            for (let key in preferences) {
                const userChoice = preferences[key];
                const zoneParamScore = n[key];

                // If data is missing, skip
                if (userChoice === undefined || zoneParamScore === undefined) continue;

                // Base weight
                let weight = 1;

                // Extra weight if this preference is in top priorities
                if (Array.isArray(top) && top.includes(key)) {
                    weight = 2;
                }

                const baseScore = 10 - Math.abs(userChoice - zoneParamScore);
                score += baseScore * weight;
            }

            return { ...n._doc, score };
        });

        scored.sort((a, b) => b.score - a.score);

        console.log("Successfully computed top 3 neighbourhoods");
        return res.status(200).json(scored.slice(0, 3));
    } catch (error) {
        console.error('Error in handleGetTop3Neighbourhood:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    handleFetchDashboard,
    handleGetAllNeighbourhoodsByCity,
    handleGetTop3Neighbourhood
}