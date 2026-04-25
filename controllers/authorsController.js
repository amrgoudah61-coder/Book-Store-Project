const asyncHandler = require('express-async-handler');   // used instead of try and catch
const {Author, validateCreateAuthor,validateUpdateAuthor} = require('../models/Authors')  // import Author from models
/**
 * @desc  get all authors
 * @route /api/authors
 * @method get
 * @access public
**/
const getAllAuthors = asyncHandler(
    async (req, res) => {
        const {pageNumber}=req.query
        const authorList = await Author.find().skip((pageNumber-1)*2).limit(2)    // pagination
        res.status(200).json(authorList
        )

    })
/**
 * @desc  get single author
 * @route /api/authors/:id
 * @method get
 * @access public
**/
const getSingleAuthor = asyncHandler(
    async (req, res) => {

        const auther = await Author.findById(req.params.id)

        if (!auther) {
            res.status(404).json({ "msg": "error not found author." })

        }
        res.json(auther)
    }
)
/**
 * @desc  create new author
 * @route /api/authors
 * @method post
 * @access private
**/
const createNewAuthor =  asyncHandler(
    async (req, res) => {
        const {error}=validateCreateAuthor(req.body)
                if (error) {
            return res.status(400).json({ msg: `${error.details[0].message}` })

                }

        const auther = new Author({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            nationality : req.body.nationality,
            image : req.body.image
        })
        const result = await auther.save()

        res.json(result)

    })
/**
 * @desc  update author
 * @route /api/authors/:id
 * @method put
 * @access private
**/
const updateAuthor =asyncHandler(
    async (req, res) => {
                const {error}=validateUpdateAuthor(req.body)
                if (error) {
            return res.status(400).json({ msg: `${error.details[0].message}` })

                }

        let auther = await Author.findByIdAndUpdate(req.params.id, {
            $set:
            {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            nationality : req.body.nationality,
            image : req.body.image

            }
        },{new : true})
        const result = await auther.save()
    res.json(result)
        res.status(200).json(result)
    })
/**
 * @desc  Delete author
 * @route /api/authors/:id
 * @method delete
 * @access private
**/
const deleteAuthor = asyncHandler(
    async (req, res) => {

        const author = await Author.findById(req.params.id)
        if (author) {
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: "Deleted. " })
        } else {
            res.status(404).json({ msg: "Not founded author" })
        }

    })
    module.exports= {getAllAuthors,
        getSingleAuthor,
        createNewAuthor,
        updateAuthor,
        deleteAuthor
    }

    //  ejs and pug are template engine 
    // ejs => used to write js code in html pages