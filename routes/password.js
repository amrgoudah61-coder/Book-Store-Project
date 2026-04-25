const express = require('express')
const { getForgotPassword, sendForgotPasswordlink, getResetPasswordLink, resetThePassword } = require('../controllers/passwordController')
const router = express.Router()

router.route('/forgot-password').get(getForgotPassword)
.post(sendForgotPasswordlink)


router.route("/reset-password/:userId/:token")
.get(getResetPasswordLink)
.post(resetThePassword)
module.exports=router

















