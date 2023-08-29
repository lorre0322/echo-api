const fs = require('fs')
const path = require('path')
const { getType } = require('../utils/content-type')
const { User , Album }=require('../module')
const { msg } = require('../utils/msg')
const { verify, verifyToken } = require('../utils/verify')
const { ConvertImgData } =require('../utils/convert-body')
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

exports.getImg=async(req,res)=>{
  let { name } = req.params
  name = path.basename(decodeURI(req.url),'.png');
  res.type("image/png;charset=utf-8")
  const data = await Album.findOne({ name })
  const base64 = data.img_data.replace(/^data:image\/\w+;base64,/, "")
  const dataBUffer = Buffer.from(base64, 'base64')
  return dataBUffer
}


exports.addImg=async(req,res)=>{
  const { name,album,desc,img_data,token }=req.body
  const {_id} = await User.findOne({ status: "admin" })
  const isToken = await verifyToken(token, _id)
  if(!isToken) return msg.er("You don't have permission .")
  const ver = verify({ name,img_data }, ['name','img_data'])
  if(ver) return msg.er("Data is not legal . ")
  const same = await Album.findOne({name})
  if(same){
    return msg.er("Had same name image .")
  }else{
    album?album:album=life
    const data = new Album({ name,album,desc,img_data }).save()
    return msg.sc({data})
  }
}

exports.getImgList=async(req)=>{
  let { page, album } = req.params
  const limit = 6
  album ? album = { album } : album = {}
  const data = await Album.find(album,{img_data:0})
    .sort({_id:-1})
    .skip((page - 1) * limit)
    .limit(limit).lean()
  const count = await Album.count()
  const list = await Album.distinct("album")
  const maxpage = Math.ceil(count / limit)
  ConvertImgData(data)
  return msg.sc({data,album:list,maxpage,count})
}


exports.delImg=async(req,res)=>{
  const { id } = req.params
  const { token }=req.body
  
  const config = await User.findOne({ status: "admin" })
  const isToken = await verifyToken(token, config._id)
  if(!token || !isToken) return msg.er("You don't have permission .")
  const data=await Album.findByIdAndRemove(id)
  if(!data) return msg.er("not found this image.")
  return msg.sc({data})
}
