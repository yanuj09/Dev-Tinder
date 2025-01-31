const {userAuth} = require("../middlewares/authMiddleware");

const express = require("express");
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest" , userAuth, async (req,res) => {

    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + " have loggedin");
});

module.exports = requestRouter;
