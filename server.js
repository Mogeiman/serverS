const express = require('express')
const app = express()
const cors = require('cors');
const router = express.Router()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config('./.env')
require('./config/db');
//Have no Idea
global.__basedir=__dirname

//communication between the front and back end
app.use(cors())

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.json())
app.use(express.static(path.join(__dirname, '/client/build/')))
require('./routes/route')(app,router)

const port = process.env.PORT || 5000
app.listen({ port},() => {
    console.log(`Server is up and running on port ${port}`)
})