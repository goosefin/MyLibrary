const Book = require("../../models/books")

const sortTitle = () =>{
    let allBooks = Book.find({})
    return allBooks.title.sort()
}