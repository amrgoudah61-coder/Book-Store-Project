const express = require('express');
const router = express();
const { verifyTokenaAndadmin, verifyTokenaAndAuthorization } = require("../middlewares/verifyToken")
const {getAllBooks,getSingleBook,createNewBook,updateBook,deleteBook}=require("../controllers/bookControoler")

router.route('/')
.get(getAllBooks)
.post(verifyTokenaAndadmin,createNewBook)
//  2
router.route('/:id')
.get(getSingleBook)
.put(verifyTokenaAndadmin,updateBook)
.delete(verifyTokenaAndadmin,deleteBook )
module.exports = router;