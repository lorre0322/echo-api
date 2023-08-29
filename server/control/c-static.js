const fs=require('fs')
const getType = require('../utils/get-type')
const cookieparser = require("cookieparser");
exports.Static=(req,res)=>{
  const { contType, pathName } = getType(req)
  res.type(`${contType};charset=utf-8`)
  // return data
  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) {
      res.send("ʕ ˙Ⱉ˙ ʔ file not found !");
    }
    res.send(data)
  });
}

exports.getImg=(req,res)=>{
  return {
    name:"hello world"
  }
}

exports.getImgList=(req,res)=>{

}

exports.addImg=async (req,res)=>{

  
}

exports.delImg=(req,res)=>{

}
