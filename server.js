require('dotenv').config('./.env')
require('./config/db');
const app = require('express')();
const port = 3000;
const cors = require('cors');
app.use(cors());

const UserRouter = require('./api/User')
const bodyParser = require('express').json;

app.use(bodyParser());

app.use('/user', UserRouter)
app.listen(process.env.PORT || port, () => {
    console.log(`server is running on port ${port}`)
})