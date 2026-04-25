const mongoose = require('mongoose');  // in line 5,6,7,8,9 that how to connect with mongodb by mongoose
const joi = require('joi');     // used in validation
const jwt = require('jsonwebtoken')

// user schema
const userSchems = new mongoose.Schema({
    
    email : {
    type :String ,
    required:true ,
    trim : true ,
    minLenght : 10,
    maxlenght :200,
    unique : true

    }
    ,username :{
    type :String ,
    required:true ,
    trim : true ,
    minLenght : 3,
    maxlenght :200,
    },
    password :{
    type :String ,
    required:true ,
    trim : true ,
    minLenght : 6,
    maxlenght :20,

    },
    isAdmin:{
    type:Boolean,
    default : false
    },
} ,{
    timestamps:true
})
// generate token
userSchems.methods.generatetoken = function(){
    return jwt.sign({id :this._id ,username : this.username, isAdmin : this.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn : "2w"})
}

//user model
const User = mongoose.model('User',userSchems)
// validate register user
function validateRegisterUser(user){
        const schema= joi.object({
            email:joi.string().trim().min(10).max(200).required().email(),
            username:joi.string().min(3).max(200).required().trim(),
            password:joi.string().min(6).max(200).required().trim(),
    
    });
    return schema.validate(user)
}
function validateLoginUser(user){
        const schema= joi.object({
            email:joi.string().trim().min(10).max(200).required().email(),
            password:joi.string().min(6).max(200).required().trim(),
            
    
    });
    return schema.validate(user)
}

function validateUpdateUser(obj) {
    const schema = joi.object({
        email:joi.string().trim().min(10).max(200).email(),
        username:joi.string().min(3).max(200).trim(),
        password:joi.string().min(6).max(200).trim()
    
    })
    return schema.validate(obj)
}
module.exports={User,validateRegisterUser,validateLoginUser,validateUpdateUser}