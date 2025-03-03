const { userAuth } = require("../middlewares/authMiddleware");

const express = require("express");
const ConnectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/user");

// request send
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignore"];
      if (!allowedStatus.includes(status)) {
        res.status(400).json({
          message: `invalid status type` + status,
        });
      }

      // checking the toUser exit in our DB

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send("user not found!!");
      }

      // Checking in the connectionRequest already exist or not
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: `connection request already exist!!` });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const connectionData = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data: connectionData,
      });
    } catch (err) {
      res.status(400).send("ERROR:- " + err.message);
    }
  }
);

// request review
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status is not allowed"});
        };

        // finding out the send request into the DB
        const foundRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId : loggedInUser,
            status: "interested"
        });

        if(!foundRequest){
            return res.status(404).json({message: "Connection Request not found"});
        }

        foundRequest.status = status;

        const data = await foundRequest.save();

        res.json({message: "Your Request " + status, data});

        /*
        anuj => virat
        *  anuj = toUserId
        *  status = interested
        *  validating the request
        * the request id should  be present into the DB
        * 
        */
    }
    catch(err){
        res.status(400).send("ERROR" + err.message);
    }
  }
);

module.exports = requestRouter;
