const {Book}= require("./models/Book")
const {Author}= require("./models/Authors")
const {books,authors}= require("./data")
const connectToDB = require("./config/db")
require("dotenv").config()

connectToDB()
const importBooks = async()=>{
    try{
        await Book.insertMany(books)
        console.log("Books was imported to database");
        
    }catch(error){
        console.log(error);
        process.exit(1)
    }}
    const importAuthors = async(req,res)=>{
        try{
            await Author.insertMany(authors)
            console.log("authors imported");
            
        }catch(err){
            console.log(err);
            
        }
    }
    
const removeBooks = async()=>{

    try{
        const count =await Book.countDocuments()
        if (count===0){
            console.log("there is no books to remove");
        }
        await Book.deleteMany()
        console.log("Books was deleted from database");
        
    }catch(error){
        console.log(error);
        process.exit(1)
    }
    
}
if (process.argv[2]==="-import"){
    importBooks()
}else if (process.argv[2]==="-remove"){
    removeBooks()
}else if (process.argv[2]=="-import-authors"){
    importAuthors()
}