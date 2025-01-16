// creating new web server

const express = require("express");

const app = express();

// Routing

// this will only handle get request
app.use("/user", (req,res)=> {
    res.send("chin Tabak Dam dam")
});

// this will only handle get request
app.get("/user", (req,res)=> {
    res.send({fName: "Anuj" , lName: "Yadav"})
});

// this will only handle post request
app.post("/user", (req,res)=> {
    console.log("Save data to the database")
    res.send("Save data to the database")
});

// this will only handle get request
app.delete("/user", (req,res)=> {
    res.send("Deleted Successfully")
});

// this will match all the http call test
app.use( "/test" ,(req,res)=>{
    res.send("hell0 from server")
})



//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});