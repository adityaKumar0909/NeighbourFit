const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

async function setUser(user){
   const accessToken =   jwt.sign({
    _id:user._id,
    email:user.email
   },ACCESS_SECRET,{expiresIn: "15m"}) ;

   const refreshToken = jwt.sign({
     _id:user._id,
    email:user.email
   },REFRESH_SECRET,{expiresIn: "7d"});

   return {accessToken,refreshToken};
}

async function getUser(token){
    if(!token) return null;
   try{
    return jwt.verify(token,ACCESS_SECRET);
   } 
   catch(err){
    return null;
   }
}

async function handleRefreshTokens(req,res){
    const refreshToken = req.cookies.refresh;

    if (!refreshToken) {
        return res.status(401).json({ mssg: "Refresh token missing" });
    }

    let user;
    try{
        user = jwt.verify(refreshToken,REFRESH_SECRET);
        //REDIRECT TO LOGIN
        if(!user){
           return  res.status(401).json({mssg:"Unauthorized access !"});
        }
    }catch(err){
        res.status(401).json({mssg:err});
    }

    try{
        const newAccessToken = jwt.sign({_id:user._id,email:user.email},ACCESS_SECRET,{expiresIn: "60m"});
        res.cookie("uid",newAccessToken , {
        // httpOnly: true,         
        secure: true,           
        sameSite: "none",    
        maxAge: 60 * 60 * 1000  // 1 hour
    });

        return res.status(200).json({mssg:"Access token refreshed"})
    }
    catch(err){
        return res.status(401).json({mssg:err});

    }


}

module.exports = {setUser,getUser,handleRefreshTokens};