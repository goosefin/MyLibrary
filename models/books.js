const mongoose = require('mongoose')

// Schema
const bookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    starRating: {type:Number, min:0, max:5, default:0},
    review: String,
    status: Boolean,
    ownedBy: String,
    isbn: Number,
    borrowed: Boolean,
    borrowedBy: String,
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book