// creating new web server

const express = require("express");

const app = express();

// Routing



// this will only handle get request
app.get("/user/:userId/:name", (req,res)=> {
    res.send({fName: "Anuj" , lName: "Yadav"})
});




//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});