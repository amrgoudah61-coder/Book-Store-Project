const express = require('express');
const router =express.Router();
const{registerNewUser,logIn}=require('../controllers/authController')
// register a new user
router.post('/register',registerNewUser)
// log in user
router.post('/login',logIn)
module.exports=router