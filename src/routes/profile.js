const {userAuth} = require("../middlewares/authMiddleware");



const express = require("express");
const profileRouter = express.Router();


profileRouter.post("/profile",userAuth, async (req,res) => {
    try{
        const user = req.user;
        /*
        const cookies = req.cookies;

        const {token} = cookies;

        if(!token){
            throw new Error("token not valid");ś
        }

        // validate my token
        // => doesn't return  boolean, it returns a decoded info
        const decodedMessage =  jwt.verify(token, "devTinder@124" );
        const {_id} = decodedMessage;

        const user = await User.findById(_id);
        

        if(!user){
            throw new error("user not found");
        }
        else{
            res.send(user);
        }
        */

        res.send(user);

        
    }
    catch(err){
        res.status(400).send("Profile not found: " + err.message);
    }


});


module.exports = profileRouter;

