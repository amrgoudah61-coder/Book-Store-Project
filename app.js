const express = require('express');
const app =express();
require('dotenv').config()   // configration
// config db
const connectToDB = require('./config/db');
    connectToDB()

    // apply middlewares
    app.use(express.json());
    app.use(express.urlencoded({extended :false}))

    app.set('view engine','ejs')   // must used 
// routes
    app.use('/api/authors' , require('./routes/authors')) // this url(/api/authors) will be existing at all routes for application
    app.use('/api/books',require('./routes/books'))  // this url(/api/books) will be existing at all routes for application
    app.use('/api/users',require('./routes/user'))  // this url(/api/users) will be existing at all routes for application
    app.use('/api/users/auth',require('./routes/auth'))  // this url(/auth/users) will be existing at all routes for application
    app.use('/password',require('./routes/password'))
    
app.listen(process.env.PORT,()=>{
    console.log('We are listining now.....')
})

console.log("jhhghgg");
