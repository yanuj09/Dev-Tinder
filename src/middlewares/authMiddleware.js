const User = require("../models/user");
const jwt = require("jsonwebtoken");



const userAuth = async (req,res,next) =>{
    try{// read the token from the cookie

        const cookies = req.cookies;
        const {token} = cookies;

        if(!token){
            throw new Error("token is invalid");
        }
        
        // validate the token
        const decodedMessage = jwt.verify(token, "devTinder@124", );
        const {_id} = decodedMessage ;
        // get the user
        
        const user = await User.findById(_id);

        if(!user){
            throw new Error("user not find");
        }
        
        req.user = user;

        next();
        
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
};




module.exports = {
    userAuth,
}