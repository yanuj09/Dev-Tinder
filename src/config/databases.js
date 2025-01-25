
const mongoose = require("mongoose");


const connectDB =  async () => {
    await mongoose.connect("mongodb+srv://Anuj:anuj%40123@anujclustor.5wa9q.mongodb.net/DevTinder");
    
};

module.exports = connectDB;



