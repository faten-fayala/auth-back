const express=require('express')
const dbConnect=require('./helpers/dbConnect')
const config=require('config')
const cors=require('cors')

const app=express()
dbConnect()
const port=5000 || config.get("SERVER_CONFIG.PORT")
app.use(cors())
app.use(express.json())
app.use('/api/users',require('./routes/userRoutes'))
app.listen( port,(err)=>{
    err ? console.log(err) : console.log(('the server is running on port 5000'))
})