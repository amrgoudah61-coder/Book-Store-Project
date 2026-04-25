const express = require('express');
const router = express();
const {getAllUsers,getSingleUser,updateUser,deleteUser}=require('../controllers/userController')
const { verifyTokenaAndadmin, verifyTokenaAndAuthorization } = require("../middlewares/verifyToken")

router.route('/')
.get(verifyTokenaAndadmin,getAllUsers)


router.route('/:id')
.get(verifyTokenaAndAuthorization,getSingleUser)
.put(verifyTokenaAndAuthorization,updateUser)
.delete(verifyTokenaAndAuthorization,deleteUser )

module.exports = router;