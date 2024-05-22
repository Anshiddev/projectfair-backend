//to load .env content into process.env
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router = require('./Router/routes')
require("./DB/connection")
const jwt = require('./Middleware/jwtMiddleware')

//creating server
const pfServer=express()

//configuring cors in server
pfServer.use(cors())

//configuration for converting json
pfServer.use(express.json())

//configuring routes to server
pfServer.use(router)

//serving uploaded files
pfServer.use('/uploads',express.static('./uploads'))

const PORT=3000

//to run server
pfServer.listen(PORT,()=>{
    console.log(`server is running at:${PORT}`)
})

pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1>The request is hit at server..</h1>")
})