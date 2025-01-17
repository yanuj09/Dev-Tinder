// creating new web server

const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth")


/*
app.use("/admin" , (req,res,next)=>{
    console.log("admin auth is checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyzs";
    if(!isAdminAuthorized){
        res.status(401).send("admin is invalid");
    }
    else{
        next();
    }
});
*/

//=> above code can be written in better way

app.use("/admin", adminAuth )


app.use("/admin/getAllData", (req, res)=>{
    // fetching the data
    //check the admin is authorise
    res.send("get all data successfully");  
});

app.post("/user/login" , (req,res)=>{
    res.send("user loggedin")
})

//=> this will not check for authorization
//=> the way of direct authoring the user auth since it only one
app.use("/user",userAuth, (req,res)=>{
    res.send("user ")
});

app.use("/admin/deleteUser", (req,res)=>{
    // check the admin authoriesd
    
    res.send("user Deleted");
    
    
});
    

/*
app.use("/admin/getAllData", (req, res,next)=>{
    // fetching the data
    //check the admin is authorise
    const token = "xyz";
    const isAdminAuthorized = token === "xyzs";
    if(isAdminAuthorized){
        res.send("get all data successfully");
    }
    else{
        res.status(401).send("admin is invalid");
    }
     
});
*/


/*
app.use("/admin/deleteUser", (req,res)=>{
    // check the admin authoriesd
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.send("user Deleted");
    }
    else{
        res.status(401).send("invalid admin")
    }
    
});
*/




//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});