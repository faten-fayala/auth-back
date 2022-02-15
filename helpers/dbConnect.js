const mongoose=require('mongoose')
const config=require('config')
const URI= "mongodb+srv://faten123:faten123@cluster0.6zkgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const dbConnect=()=>{
  mongoose.connect(config.get("DB_CONNEXION.URI"), (err)=>{
    err ? console.log(err) : console.log('the database is connected')
}) } 

module.exports=dbConnect
