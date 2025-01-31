const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateSignUpData = require("../utils/validation");
const validator = require("validator");

const express = require("express");
const authRouter = express.Router();



authRouter.post("/signUp" , async (req,res) =>{
    
    
    const {firstName, lastName, email, password} = req.body;
    
    try{
    // validating the data
    validateSignUpData(req);

    // encrypting the data
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // since how my req.body is same as the userobj
    // made the adding user info dynamic
   // const userObj = req.body;

    // const userObj = {
    //     firstName: "Anu",
    //     lastName: "malik",
    //     email: "anu@malik.com",
    //     password: "anu@123",
    //     age: "43",
    //     gender: "male"
    // };

    // creatign a new instance of the model
    const user = new User({
        firstName,
        lastName,
        email,
        password : passwordHash,
    });


    // save function to save the info into the db. It return a promise 
    // always wrapp the db operation into the try catch block
    
        await user.save();
        res.send("User signUp Successfully")
    }
    catch(err) {
        res.status(400).send("Error saving the data:" + err.message);
    }
    
});


authRouter.post("/login" , async (req,res) => {
    try{
        const {email, password} = req.body;
        
        // validation email
        if(!validator.isEmail(email)){
            throw new Error("Enter a valid Email");
        }

        // finding out the email presend or not
        const user = await User.findOne({email:email});

        if(!user){
            throw new Error("invalid crediticial");
        }


        // return a boolean value
        //const isValidPassword  = await bcrypt.compare(password, user.password);
        const isValidPassword = await user.validatePassword(password);
        
        if(isValidPassword){

            // jwt token

            //const token = jwt.sign({_id: user._id} , "devTinder@124", {expiresIn: "7d"});
            const token = await user.getJWT();


            // cookiee {maxAge: 5000 }
            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)} );


            res.send("login successful");
        }
        else{
            throw new Error("invalid creditial");
        }
    }
    catch(err){
        res.status(400).send("Error in login: " + err.message);
    }
});



module.exports = authRouter;