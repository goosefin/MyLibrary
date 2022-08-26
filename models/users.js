const mongoose = require('mongoose')
//const book = require('./books')

const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    //books: [Book]
    //book: new.mongoose.Schema({
        // title: {type:String, required:true},
        // author: {type:String, required:true},
        // starRating: {type:String, min:0, max:5, default:0},
        // review: String,
        // status: Boolean,
        // isbn: String,
        // borrowed: Boolean,
        // borrowedBy: String,
        // })
})

const User = mongoose.model('User',userSchema)
module.exports = User