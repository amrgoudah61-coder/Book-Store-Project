const asyncHandler =require('express-async-handler')
require('dotenv').config()    //configration
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {User}=require('../models/User')
const nodemailer = require("nodemailer");



const getForgotPassword= asyncHandler((req,res)=>{
    res.render('forgot-password')
})
/**
 * @desc  send Forgot Passwordlink
 * @route /password/forgot-password
 * @method post
 * @access public
**/

const sendForgotPasswordlink= asyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const secret = process.env.JWT_SECRET_KEY + user.password
    const token = jwt.sign({email : user.email,id:user.id},secret,{expiresIn:"10m"})
    
    const link = `http://localhost:3000/password/reset-password/${user._id}/${token}`

    // res.json({message : 'click on th link..> ',restpasswordlink : link })
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
                user :process.env.USER_EMAIL ,
                pass : process.env.USER_PASS
    }
})
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: 'kmrw8630@gmail.com',
    subject: "Reset Password",
    html: `<div>
              <h4>Click on the link below to reset your password</h4>
              <p>${link}</p>
          </div>`
  }
  transporter.sendMail(mailOptions, function(error, success){
    if(error){
      console.log(error);
      res.status(500).json({message: "something went wrong"});
    } else {
      console.log("Email sent: " + success.response);
      res.render("link-send");
    }
  });
 
})


/**
 * @desc get reset password link
 * @route /password/reset-password/:userId/:token
 * @method get
 * @access public
**/
const getResetPasswordLink = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    const secret = process.env.JWT_SECRET_KEY + user.password
    try{
        jwt.verify(req.params.token,secret)
        res.render('reset-password',{email : user.email})
    }catch(err){
        console.log(err);
        res.json({msg :"error"})
        
    }})

    /**
 * @desc  reset password 
 * @route /password/reset-password/:userId/:token
 * @method post
 * @access public
**/
const resetThePassword =  asyncHandler(async(req,res)=>{
    const user = await User.findById([req.params.userId])
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    const secret = process.env.JWT_SECRET_KEY + user.password
    try{
        jwt.verify(req.params.token,secret)
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
        user.password=req.body.password
        await user.save()
        res.render('success-password')
    }catch(err){
        console.log(err);
        res.json({msg :"error"})
        
    }})
module.exports={
    getForgotPassword,
    sendForgotPasswordlink,
    getResetPasswordLink,
    resetThePassword
}





















