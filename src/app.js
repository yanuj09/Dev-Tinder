// creating new web server

const express = require("express");
const connectDB = require("./config/databases");
const app = express();
const User = require("./models/user");

app.post("/signUp" , async (req,res) =>{
    const userObj = {
        firstName: "Anu",
        lastName: "malik",
        email: "anu@malik.com",
        password: "anu@123",
        age: "43",
        gender: "male"
    };

    // creatign a new instance of the model
    const user = new User(userObj);


    // save function to save the info into the db. It return a promise 
    // always wrapp the db operation into the try catch block
    try{
        await user.save();
        res.send("User signUp Successfully")
    }
    catch(err) {
        res.status(400).send("Error saving the data:" + err.message);
    }
    
})




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







