const path=require('path')
const fs=require('fs')
const getType = require('../utils/get-type')
const cookieparser = require("cookieparser");
const { msg,verify,verifyPermit,verifyToken } = require('../utils');
const { User , Album } = require('../model')
// Response file
exports.Static=(req,res)=>{
  const { contType, pathName } = getType(req)
  res.type(`${contType};charset=utf-8`)
  // return file
  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) res.send("ʕ ˙Ⱉ˙ ʔ file not found !");
    res.send(data)
  });
}

// Response image buffer
exports.getImg=async(req,res)=>{
  let { name } = req.params
  name = path.basename(decodeURI(req.url),'.png');
  res.type("image/png;charset=utf-8")
  const data = await Album.findOne({ name })
  // If not found return 1 pixel 
  if(!data){
    return Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4",'base64')
  }
  const base64 = data.base64.replace(/^data:image\/\w+;base64,/, "")
  return Buffer.from(base64, 'base64')
}

exports.getImgList=(req,res)=>{
  const { page } = req.params
  const { album } = req.query
}

// Upload image
exports.addImg=async (req,res)=>{
  let { user , token , name , album , desc , base64 } = req.body
  verify({name,base64},['name','base64',],res)
  // Checkout repeat
  const same = await Album.findOne({name})
  if(same) return msg.er("Already have a same name photo.")
  // Verify permission
  const { group,_id } = await User.findOne({name:user})
  verifyPermit(group,res)
  verifyToken(token,_id,res)
  // Default description
  desc?desc:desc=""
  album?album:album="life"
  try {
    const save = await new Album({
      name , album , desc , base64
    }).save()
    if(save) return msg.sc({name,album,desc})
  } catch (error) {
    return msg.er('Save failed')
  }
}

// Delete image
exports.delImg = async(req,res)=>{
  const { id } = req.params
  let { user , token } = req.body
  // Verify permission
  const { group,_id } = await User.findOne({name:user})
  verifyPermit(group,res)
  verifyToken(token,_id,res)
  // Find and delete
  const data=await Album.findByIdAndRemove(id)
  if(!data) return msg.er("not found this image.")
  return msg.sc({data})
}