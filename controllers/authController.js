
const asyncHandler = require('express-async-handler');   // used instead of try and catch
const bcrypt =require('bcryptjs')
const {User,validateLoginUser,validateRegisterUser}=require('../models/User')

/**
 * @desc register new user 
 * @route /api/auth/register
 * @method post
 * @access public
 */
const registerNewUser = asyncHandler(async(req,res)=>{
    const{error}=validateRegisterUser(req.body)
    if(error){
        res.status(400).json(`msg : ${error.details[0].message}`) 
    }
    let user =await User.findOne({email:req.body.email})
    if(user){
        res.status(400).json({message : 'user is already registered'})
    } 
    const salt =await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
    user = new User({
        email :req.body.email,
        username :req.body.username,
        password :req.body.password,
        isAdmin :req.body.isAdmin
    })
    const result = await user.save()
    const token = user.generatetoken()
    // console.log(user.isAdmin);
    
    const {password, ...other }= result._doc    // user._doc meaning the entire data for user
    res.status(200).json({...other ,token})
    // console.log(req.headers);
    
})

/**
 * @desc log in user 
 * @route /api/auth/login
 * @method post
 * @access public
 */
const logIn = asyncHandler(async(req,res)=>{
    const{error}=validateLoginUser(req.body)
    if(error){
        res.status(400).json(`msg : ${error.details[0].message}`) 
    }
    let user =await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({message : 'invalid email or password'})
    }
    const isPasswordMatch =await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordMatch){
        return res.status(400).json({message : 'invalid email or password'})

    }
    const token = user.generatetoken()
    // console.log(user.isAdmin);
    
    const {password, ...other }= user._doc    // user._doc meaning the entire data for user
    res.status(200).json({...other ,token})
    // console.log(req.headers);
    
})
module.exports={registerNewUser,logIn}