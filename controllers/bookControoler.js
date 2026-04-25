const asyncHandler = require('express-async-handler');   // used instead of try and catch
const {Book,validateCreateNewBook ,validateUpdateBook} = require('../models/Book')  // import Author from models

/**
 * @desc  get all books
 * @route /api/books
 * @method get
 * @access public
**/
const getAllBooks =  asyncHandler(async (req, res) => {
    console.log(req.query);
    const {minPrice , maxPrice}=req.query
    // comparison query operators =>
    // $eq => equal
    // $ne => not equal
    // $lt => less than
    // $lte => less than or equal
    // gt => grater than
    // $gte => greater than or equal
    // $in => in matches value in array
    // $nin =>  except  value in array
    // ....... and more 
    let books;
    if (minPrice && maxPrice){
    books= await Book.find({price:{$gte :minPrice , $lte : maxPrice}}).populate("author",["_id","firstName","lastName"])
    // const A = await Book.find({price:{$ne:10}})

    }else {
    books = await Book.find().populate("author",["_id","firstName","lastName"])
    // console.log(req.query);
    }
    res.status(200).json(books)
})
/**
 * @desc  get single book
 * @route /api/books/:id
 * @method get
 * @access public
**/
const getSingleBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (!book) {
        res.status(404).json({ "msg": "error not found book." })
    }
    res.json(book)
})
/**
 * @desc  create new book
 * @route /api/books
 * @method post
 * @access private
**/

const createNewBook =  async (req, res) => {
    // // we must do validation schema first 
    // const schema = joi.object({
    //     Title: joi.string().trim().min(3).max(200).required(),
    //     description: joi.string().trim().min(3).max(200).required(),
    //     author : joi.string().trim().min(3).max(200).required(),
    //     price: joi.number().required(),
    //     cover : joi.string().trim().required()

    // });
    const { error } = validateCreateNewBook(req.body);
    if (error) {
        return res.status(400).json({ msg: `${error.details[0].message}` })
    }
    const book = new Book({
        Title: req.body.Title,
        description :req.body.description,
        author :req.body.author,
        price: req.body.price,
        cover: req.body.cover
    })
    const result = await book.save()
    res.json(result)

}
/**
 * @desc  update book
 * @route /api/books/:id
 * @method put
 * @access private
**/

const updateBook =  asyncHandler(
    async (req, res) => {
    const {error}=validateUpdateBook(req.body)
    if(error){
        res.status(400).json({ msg: `${error.details[0].message}` })
    }
        let book = await Book.findByIdAndUpdate(req.params.id, {
            $set:
        {
        Title: req.body.Title,
        description :req.body.description,
        author :req.body.author,
        price: req.body.price,
        cover: req.body.cover
        }
        })
        res.status(200).json(book)
    })
/**
 * @desc  Delete book
 * @route /api/books/:id
 * @method delete
 * @access private
**/

const deleteBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id)
    if (book) {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: ' deleted ' })
    } else {
        res.status(404).json({ msg: 'not founded' })
    }

})
module.exports={
    getAllBooks,
    getSingleBook,
    createNewBook,
    updateBook,
    deleteBook
}