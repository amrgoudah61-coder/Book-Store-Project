const mongoose = require('mongoose');  // in line 5,6,7,8,9 that how to connect with mongodb by mongoose
const joi = require('joi');     // used in validation

const AuthorSchema = new mongoose.Schema({
    firstName :{
    type :String ,
    required:true ,
    trim : true ,
    minLenght : 3,
    maxlenght :200,
    }, 
    lastName :{
    type :String ,
    required:true ,
    trim : true ,
    minLenght : 3,
    maxlenght :200,
    }, 

    nationality :{

    type:String,
    required:true,
    trim :true ,
    minLenght : 3,
    maxlenght :200,

    },
    image:{
        type : String,
        default :"default-avatar.png"
    }
} ,{
    timestamps:true
});
function validateCreateAuthor(obj) {
    const schema = joi.object({
        firstName:joi.string().trim().min(3).max(200).required(),
        lastName:joi.string().trim().min(3).max(200).required(),
        nationality:joi.string().min(3).max(200).trim().required(),
        image:joi.string()
    
    })
    return schema.validate(obj)
}
function validateUpdateAuthor(obj) {
    const schema = joi.object({
        firstName:joi.string().trim().min(3).max(200).required(),
        lastName:joi.string().trim().min(3).max(200).required(),
        nationality:joi.string().min(3).max(200).trim().required(),
        image:joi.string()
    
    })
    return schema.validate(obj)
}

const Author =mongoose.model('Author',AuthorSchema) // collection in db
module.exports={Author,validateCreateAuthor,validateUpdateAuthor}