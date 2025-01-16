// creating new web server

const express = require("express");

const app = express();

app.use( "/test" ,(req,res)=>{
    res.send("hell from server")
})

//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});