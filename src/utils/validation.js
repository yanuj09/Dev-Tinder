const validator = require("validator");


const validateSignUpData = (req)=>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName  || !lastName){
        throw new Error("Name is not valid ");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter a valid email");
    }
    else if(! (validator.isStrongPassword(password, {minLength: 8, minLowercase: 1,
              minUppercase:1, minNumbers:1, minSymbols:1}))) {
        
        throw new Error("Enter a strong password");
    
    }
};

module.exports = validateSignUpData;