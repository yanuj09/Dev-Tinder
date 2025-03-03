const { userAuth } = require("../middlewares/authMiddleware");

const express = require("express");
const ConnectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try{
        const fromUserId = req.user;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignore"];
        if(!allowedStatus.includes(status)){
            res.status(400)
            .json({
                message: `invalid status type` + status
            });
        }

        // checking the toUser exit in our DB

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send("user not found!!");
        }

        // Checking in the connectionRequest already exist or not
        const existingConnectionRequest = await ConnectionRequestModel.findOne({$or : [{
            fromUserId,
            toUserId
        },
        {
            fromUserId : toUserId,
            toUserId : fromUserId
        }
        ]});

        if(existingConnectionRequest){
           return res.status(400).json({message: `connection request already exist!!`});
        };



        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });


        const connectionData = await connectionRequest.save();

        res.json({
            message: req.user.firstName+ " is " + status+ " in " + toUser.firstName,
            data : connectionData
        });

    }
    catch(err){
        res.status(400).send("ERROR:- "  + err.message);
    }
  }
);

module.exports = requestRouter;
