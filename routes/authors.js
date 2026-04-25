const express = require('express');
const router = express.Router();
const { verifyTokenaAndadmin, verifyTokenaAndAuthorization } = require('../middlewares/verifyToken');
const { getAllAuthors, getSingleAuthor, createNewAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorsController');

router.route('/')
// get all authors
.get(getAllAuthors)
// create new authors
.post(createNewAuthor)

router.route('/:id')
// get single author
.get(getSingleAuthor )
// update author
.put(verifyTokenaAndAuthorization,updateAuthor )
// delete author
.delete(verifyTokenaAndadmin,deleteAuthor )

module.exports = router;