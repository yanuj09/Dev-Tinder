const mongoose = require("mongoose");


// way of defineing schema
const userSchema = new mongoose.Schema({
    // define schema and its types
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
    }
});

// model is used to make the use of schema
// creating model first parameter as name of the model and second parameter schema
const UserModel = mongoose.model("User" , userSchema);

module.exports = UserModel;