const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills abouts";

// what connection request the loggedInUser have received
userRouter.get("/user/requests/received", 
    userAuth, 
    async (req, res) => {
        try{
            const loggedInUser = req.user;

            const connectionRequest = await ConnectionRequestModel.find({
                toUserId: loggedInUser._id,
                status: "interested"
                // populating the fromUserId data from user documents 
            }).populate("fromUserId", "firstName lastName photoUrl age gender skills abouts")
            // .populate("fromUserId", ["firstName" , "lastName"]);

            

            res.json({message: "Your connection request" , connectionRequest})
        }
        catch(err){
            res.status(400).send("ERROR " + err.message);
        }
});

// what are the loggedIn user connection
userRouter.get("/user/connections", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                {toUserId: loggedInUser, status: "accepted"},
                {fromUserId: loggedInUser, status: "accepted"}
            ]
        }).populate("fromUserId" , USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map(row => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({data: data});
    }
    catch(err){
        res.status(404).send("ERROR " + err.message);
    }
});

module.exports= userRouter;
