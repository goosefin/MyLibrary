const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/users.js')
const { route } = require('./booksCtr.js')

// Sign Up
router.get('/signup', (req,res) =>{
    res.render('users/signup.ejs')
})

router.post('/signup', (req,res) =>{
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    User.findOne({username:req.body.username}, (err,userExists) =>{
        if(userExists){
            res.send('That username is taken, please select another one')
        }else{
            User.create(req.body, (err, createdUser) =>{
                if(err){
                    console.log(err)
                }else{
                    req.session.currentUser = createdUser
                    res.redirect('/mylibrary')
                }
            })
        }
    })
})



module.exports = router