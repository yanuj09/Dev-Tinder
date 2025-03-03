const {
  userAuth,
  validateEditProfileData,
} = require("../middlewares/authMiddleware");

const express = require("express");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).send("Profile not found: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log(req.body);
    if (!validateEditProfileData(req)) {
      throw new Error("input data is not allowed");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    //=> another way to send respond in the form of json
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully!`,
      data: loggedInUser,
    });


  } catch (err) {
    res.status(400).send("invalid creditential" + err.message);
  }
});

module.exports = profileRouter;
