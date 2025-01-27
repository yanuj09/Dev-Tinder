const mongoose = require("mongoose");
const validator = require("validator");

// way of defineing schema
const userSchema = new mongoose.Schema({
    // define schema and its types
    firstName: {
        type: String,
        required : true,
        minLength: 4,
        maxLength: 50,

    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please enter an valid email")
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        thisvalidate(value){
            if(!(validator.isStrongPassword(value,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))){
                throw new Error("Please Enter a strong password");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("gender data is not valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://pngtree.com/freepng/user-vector-avatar_4830521.html",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL not valid" + err.message);
            }
        }
    },
    about: {
        type: String,
        default: "This is the default discription of the user",
        maxLength: 255,
    },
    skills: {
        type: [String]
    }

}, {
    timestamps: true,
});

// model is used to make the use of schema
// creating model first parameter as name of the model and second parameter schema
const UserModel = mongoose.model("User" , userSchema);

module.exports = UserModel;