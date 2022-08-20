const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')

router.get('/', (req,res) =>{
    res.send('Working')
})

router.get('/seed', (req,res) =>{
    Book.create([
        {
            title: 'One Shot',
            author: 'Lee Child',
            starRating: 5,
            review: 'Another hit from mister Lee Child',
            status: true,
            ownedBy: 'agustinafin96@gmail.com' 
        },
        {
            title: 'The Killing Floor',
            author: 'Lee Child',
            starRating: 5,
            review: 'This is the first Jack Reacher book i read and was immediately hooked. Reacher is such an intriguing character and you just want to keep reading to find out who he is and how he got himself to this place.',
            status: true,
            ownedBy: 'agustinafin96@gmail.com'
        },
        {
            title: 'Die Trying',
            author: 'Lee Child',
            starRating: 4,
            review: 'A page turner. Again Reacher is in hot water without meaning to which is pretty on par for him and his luck.',
            status: true,
            ownedBy: 'agustinafin96@gmail.com'
        }
    ], (err, data) =>{
        res.redirect('/mylibrary')
    })
})

module.exports = router