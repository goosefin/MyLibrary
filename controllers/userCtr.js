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

// Sign In
router.get('/signin', (req,res) =>{
    res.render('users/signin.ejs')
})

router.post('/signin', (req,res) =>{
    User.findOne({email:req.body.email}, (err, foundUser) =>{
        if(foundUser){
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(validLogin){
                req.session.currentUser = foundUser
                res.redirect('/mylibrary')
            }else{
                res.send('Invalid email or password')
            }
        }else{
            res.send('Invalid email or password')
        }
    })
})

//Sign Out
router.get('/signout', (req,res) =>{
    req.session.destroy()
    res.redirect('/mylibrary')
})

module.exports = router