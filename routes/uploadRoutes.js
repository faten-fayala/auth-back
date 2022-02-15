const express=require('express')
const multer=require('multer')
const router=express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  const storage=
module.exports=router
//.path the extension of the actual file .png ou .jpg
//Path.extname: get the extension of a file name

//upload allow any type of file weni man7ebech donc whats im gonna donc we pass filefilter a fonction

//path nodejs path to work with path