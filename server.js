const express = require('express')
const app = express()
const cors = require('cors');
const router = express.Router()
const bodyParser = require('body-parser')

require('dotenv').config('./.env')
require('./config/db');

//communication between the front and back end
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))


app.use(express.json())
require('./routes/route')(app,router)

const port = process.env.PORT || 5000
app.listen({ port},() => {
    console.log(`Server is up and running on port ${port}`)
})