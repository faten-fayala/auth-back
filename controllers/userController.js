const User=require('../models/UserModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')

const config=require('config')
const register=async(req,res)=>{
    try{
        const errors=validationResult(req)
        if (!errors.isEmpty())
        return res.status(400).json({errors:errors.mapped()})
const {firstname,lastname,email,password}=req.body
const user=await User.findOne({email})
if (user) return res.status(400).json({errors:{msg:'user already exist'}})
const newUser=new User({firstname,lastname,email,password})
// const salt=await bcrypt.genSalt(10)
const hash=await bcrypt.hash(newUser.password,10)
console.log(hash)
newUser.password=hash
const registredUser=await newUser.save()
const payload={sub:registredUser._id}
const token=await jwt.sign(payload,config.get('JWT_CONFIG.SECRET'))
res.json({token})
    }
    catch(err){
        res.status(500).json({errors:[{msg:err.message}]})
    }
}
const login=async(req,res)=>{
    try {
        const errors=validationResult(req)
        if (!errors.isEmpty())
        return res.status(400).json({errors:errors.mapped()})
const {email,password}=req.body
const user=await User.findOne({email})
if (!user) return res.status(400).json({errors:{msg:'please register before'}})
const isMatch=await bcrypt.compare(password,user.password)
if (!isMatch) return res.status(400).json({errors:{msg:'wrong password'}})
const payload={
    sub:user._id
}
const token=await jwt.sign(payload,config.get('JWT_CONFIG.SECRET'))
res.json({token})
    }
    catch(err){
res.status(500).json({errors:[{msg:err.message}]})
    }
}
const getUserProfile=async(req,res)=>{
    try{
const user=await User.findById(req.userId)
res.json(user)

    }
    catch(err){
        res.status(500).json({errors:[{msg:err.message}]})
    }
}
module.exports={register,login,getUserProfile}