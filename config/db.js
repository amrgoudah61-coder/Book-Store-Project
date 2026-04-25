const mongoose = require('mongoose');  // in line 5,6,7,8,9 that how to connect with mongodb by mongoose
require('dotenv').config()    //configration
function connectToDB(){ 

    try{
        mongoose
        .connect(process.env.MONGO_URI) 
        console.log("connected sucsessfuly to mongodb")
    }catch(err){
        console.log("fConnection failed to mongodb",err);
    }
}


    // mongoose
    //     .connect(process.env.MONGO_URI)    // this expression return promise
    //     .then(()=>{console.log("connected sucsessfuly to mongodb")}).
    //     catch((err)=>{console.log(err);
    //     });
    
module.exports=connectToDB;