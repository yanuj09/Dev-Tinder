const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills abouts";

// what connection request the loggedInUser have received
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // populating the fromUserId data from user documents
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender skills abouts"
    );
    // .populate("fromUserId", ["firstName" , "lastName"]);

    res.json({ message: "Your connection request", connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

// what are the loggedIn user connection
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser, status: "accepted" },
        { fromUserId: loggedInUser, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (err) {
    res.status(404).send("ERROR " + err.message);
  }
});

// Feed API - Gets you the profiles of other user on platforms
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //showing all the profile of the users except
    // 1. own profile - loggedin user
    // 2. loggedIn user connection
    // 3. ignore profiles
    // 4. pending requests

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit ;

    const skip = (page - 1)* limit;

    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hiddenUsersFromFeed = new Set();
    connectionRequest.forEach((request) => {
      hiddenUsersFromFeed.add(request.fromUserId.toString());
      hiddenUsersFromFeed.add(request.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

module.exports = userRouter;
