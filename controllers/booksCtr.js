const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')

//Authenification middleware
const authRequired = (req,res,next) =>{
    if(req.session.currentUser){
        next()
    }else{
        res.send('you must be logged in to do that!')
    }
}

//Simple Seed
router.get('/seed', (req,res) =>{
    Book.create([
        {
            title: 'One Shot',
            author: 'Lee Child',
            starRating: 5,
            review: 'Another hit from mister Lee Child.',
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

// Index
router.get('/', (req,res) =>{
    Book.find({}, (err, allBooks) =>{
        if(err){
            console.log(err)
        }else{
            res.render('index.ejs',{allBooks})
        }
    })
})

// New
router.get('/new', authRequired, (req,res) =>{
    res.render('new.ejs')
})

router.post('/', (req,res) =>{
    if(req.body.status == 'on'){
        req.body.status = true
    } else{
        req.body.status = false
    }
    if(req.body.borrowed == 'on'){
        req.body.borrowed = true
    } else{
        req.body.borrowed = false
    }
    Book.create(req.body, (err,book) =>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/mylibrary')
        }
    })
})

// Show
router.get('/:id', (req, res) =>{
    Book.findById(req.params.id, (err,book) =>{
        res.render('show.ejs', {book})
    })
})

// Edit
router.get('/:id/edit', authRequired, (req,res) =>{
    Book.findById(req.params.id, (err,book) =>{
        res.render('edit.ejs', {book})
    })
})
    
router.put('/:id', (req,res) =>{
    if(req.body.status === 'on'){
        req.body.status = true
    }else{
        req.body.status = false
    }
    if(req.body.borrowed == 'on'){
        req.body.borrowed = true
    } else{
        req.body.borrowed = false
    }
    Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBook) =>{
        res.redirect('/mylibrary/'+req.params.id)
    })
})

// Delete
router.delete('/:id', authRequired, (req,res) =>{
    Book.findByIdAndRemove(req.params.id, (err, book) =>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/mylibrary')
        }
    })
})


module.exports = router