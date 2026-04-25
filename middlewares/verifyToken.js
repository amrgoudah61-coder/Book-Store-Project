const jwt = require("jsonwebtoken")
require('dotenv').config()   //configration

function verifyToken(req, res, next) {
    // const token = req.headers.token;
    const token = req.headers.token
    if (token) {
        try {
            // Usuall|y token is "Bearer <token>"

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded


            next()
        } catch (err) {
            res.status(401).json({ "msg": "invalid token" })
        }
    } else {
        res.status(401).json({ "msg": "no token provided" })
    }
}

function verifyTokenaAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {

        if (req.params.id === req.user.id || req.user.isAdmin) {

            next()
        } else {
            return res.status(403).json({ msg: "you are not allaowed " })
        }
    })
}
function verifyTokenaAndadmin(req, res, next) {
    verifyToken(req, res, () => {
        console.log("id:", req.user.id);
        console.log("isadmin:", req.user.isAdmin);

        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ msg: "You are not allaowed 'only admin'" })
        }
    })
}
module.exports = { verifyToken, verifyTokenaAndadmin, verifyTokenaAndAuthorization }