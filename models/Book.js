
const joi = require('joi');
const mongoose = require('mongoose');  // in line 5,6,7,8,9 that how to connect with mongodb by mongoose
const booksSchema=new mongoose.Schema({
    title: {
        type : String,
        required:true ,
        trim : true ,
        minLength : 3,
        maxLength :200,
    },author: {
        type : mongoose.Schema.Types.ObjectId,
        require: true ,
        ref :"Author"
    },
    description: {
        type : String,
        required : true ,
        trim : true ,
        minLength : 5

    },
    price: {
        type : Number ,
        required : true ,
    },cover : {
        type : String ,
        required : true ,
        enum : ["soft cover","hard cover"]
    }
},{
    timestamps : true
})
function validateCreateNewBook(book){
        const schema = joi.object({
            Title: joi.string().trim().min(3).max(200).required(),
            description: joi.string().trim().min(3).max(200).required(),
            author : joi.string().trim().min(3).max(200).required(),
            price: joi.number().required(),
            cover : joi.string().trim().required()
    
        });
    return schema.validate(book)
}

function validateUpdateBook(book){
        const schema = joi.object({
            Title: joi.string().trim().min(3).max(200).required(),
            author : joi.string().trim().min(3).max(200).required(),
            description: joi.string().trim().min(3).max(200).required(),
            price: joi.number().required(),
            cover : joi.string().trim().required()
    
        });
    return schema.validate(book)
}


const Book = mongoose.model('Book',booksSchema)
module.exports={Book,validateCreateNewBook,validateUpdateBook}