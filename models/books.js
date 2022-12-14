const mongoose = require('mongoose')

// Schema
const bookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    starRating: {type:String, min:0, max:5, default:0},
    review: String,
    status: Boolean,
    isbn: String,
    borrowed: Boolean,
    borrowedBy: String,
    username: String,
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book 