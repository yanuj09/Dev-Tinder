// creating new web server

const express = require("express");
const connectDB = require("./config/databases");
const app = express();
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

// middleware privided by express to convert json req into the object
app.use(express.json());

app.post("/signUp" , async (req,res) =>{
    
    const {firstName, lastName, email, password} = req.body;
    
    try{
    // validating the data
    validateSignUpData(req);

    // encrypting the data
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // since how my req.body is same as the userobj
    // made the adding user info dynamic
    const userObj = req.body;

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

app.post("/login" , async (req,res) => {
    try{
        const {email, password} = req.body;
        
        // validation email
        if(!validator.isEmail(email)){
            throw new Error("Enter a valid Email");
        }

        // finding out the email presend or not
        const user = await User.findOne({email:email});

        if(!user){
            throw new Error("User not found");
        }


        // return a boolean value
        const isValidPassword  = await bcrypt.compare(password, user.password);

        if(isValidPassword){
            res.send("login successful");
        }
        else{
            throw new Error("incorrect password");
        }
    }
    catch(err){
        res.status(400).send("Error in login: " + err.message);
    }
})

// getting only single user
app.get("/user" , async (req,res) => {
    const userEmail = req.body.emailId;


    try{
        
        const user = await User.findOne({email: userEmail});
        
        if(!user){
            res.status(404).send("user not found !")
        }
        else{
            res.send(user);
        }
    }
    catch{
        res.status(400).send("something went wrong");
    }

    
    // res.send(users);

    /*
    try{
        const users = await User.find({email:userEmail });
        
        // suppose the reqested email not found so in place returning empty string return 404 error
        if(users.length === 0) {
            res.status(404).send("user not found !")
        }
        else{
            res.send(users);
        }
        
    }
    catch{
        res.status(400).send("something went wrong");
    }
        */
});

// fetch GET/feet get all the user user from the db
app.get("/feed" , async (req,res)=>{

    try{
        // passing empty filter to get all the data
        const users = await User.find({});
        res.send(users);
    }
    catch{
        res.status(400).send("something went wrong");
    }
    
});

//delete api
app.delete("/user", async (req,res) =>{
    const UserId = req.body.userId;

    try{
        
        const user = await User.findByIdAndDelete({_id: UserId}); // here i can directly pass the ({UserId});
        res.send(user);
    }
    catch{
        res.status(400).send("something went wrong");
    }
});


// update data of the user

app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
    try{
        //console.log(userId);
        const ALLOWED_UPDATES = ["photoUrl" , "firstName", 'lastName' ,"about" , "gender" , "age" , "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => {
            return ALLOWED_UPDATES.includes(k);
        });

        if(!isUpdateAllowed) {
            throw new Error("Updates not allowed");
        }

        if(data.skills && data?.skills.length > 100){
            throw new Error("skills cannot be more than 10")
        }

        const user =  await User.findByIdAndUpdate({_id: userId} , data,
            {returnDocument : "before", 
                runValidators: true, 
            });
         //await User.findOneAndUpdate({email: UserId} , data); // => updating by email
        console.log(user);
        res.send("data updated successfully");
    }
    catch(err){
        res.status(400).send("Update failed:" + err.message);
    }
});


// connecting DB first then start listening at port 4000
connectDB().then(
    () => {
        console.log("db connection establised successfully");
        //=>listening the server on the port
        app.listen(4000, ()=>{
            console.log("server successfully started");
        });
    }
)
.catch(err => {
    console.log("Database cannot be connected!!!");
});



// app.get("/user" , (req,res,next) => {

//     try{throw new error("adadf");
//         res.send("User login successfully");
      
//     }
//     catch(err) {
//         res.status(500).send("some error contact support team");
//     }
    
// });

// app.use("/", (err,req,res,next) => {
//     if(err){
//         res.status(500).send("something went wrong");
//     }
// });







