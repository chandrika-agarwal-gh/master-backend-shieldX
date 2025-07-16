require('dotenv').config()
const express = require('express')
const cors=require('cors')
const app = express()
const mongoose=require('mongoose')
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const prodRoute = require("./Routes/productRoute")
app.use('/',prodRoute)
mongoose.connect(process.env.CONNECT)
    .then(result => {
        console.log("connected to mongoDb");
        app.listen(process.env.PORT)
    }).catch(err => console.log("error connecting to mongoDb ", err))

