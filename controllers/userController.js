const asyncHandler = require('express-async-handler');   // used instead of try and catch
const {User,validateUpdateUser} = require('../models/User')  // import Author from models
const bcrypt = require('bcryptjs')

/**
 * @desc  get all users
 * @route /api/users
 * @method get
 * @access public
**/
const getAllUsers =  asyncHandler(async (req, res) => {
    const myUsers = await User.find()
    if (!myUsers) {
        res.status(404).json({ message: 'Data not found' })
    } else {

        res.status(200).json(myUsers)

    }
})
/**
 * @desc  get single user
 * @route /api/users/:id
 * @method get
 * @access public
**/
const getSingleUser =  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        res.status(404).json({ "msg": "error not found user." })
    } else {
        // const {password, ...other }= user._doc    // user._doc meaning the entire data for user
        // res.status(200).json({...other})
        res.status(200).json(user)

    }
})

/**
 * @desc  update user
 * @route /api/users/:id
 * @method put
 * @access private
**/
const updateUser =  asyncHandler(async (req, res) => {
    // بسم الله 
    // this is authorization =>
    // if(req.params.id !== req.user.id ){
    //     return res.status(403) // forbidden
    //     .json({msg :"you are not allaowed , you onlt can update your profile"})
    // }
    const { error } = validateUpdateUser(req.body)
    if (error) {
        res.status(400).json(`msg : ${error.details[0].message}`)
    }

    if (req.body.password) {

        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    }, { new: true })


    res.status(200).json(updatedUser)

})
/**
 * @desc  Delete user
 * @route /api/users/:id
 * @method delete
 * @access private
**/
const deleteUser =asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: ' deleted ' })
    } else {
        res.status(404).json({ msg: 'not founded' })
    }

})

// post method as register and login at auth.js
module.exports= {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}