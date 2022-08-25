// Required packages
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const {render} = require('ejs')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()

// DotEnv import
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Controllers
const booksController = require('./controllers/booksCtr.js')
const usersController = require('./controllers/userCtr.js')

// Mongoose
mongoose.connect(mongoURI);
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// Imports
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use('/mylibrary', booksController)
app.use('/users', usersController)

// app.get('/mylibrary', (req,res) =>{
//     res.send('Working')
// })

app.get('/', (req,res) =>{
    res.render('about.ejs')
})

//Listener
app.listen(PORT, () =>{
    console.log('listening on port: ' + PORT)
})