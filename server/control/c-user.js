const { User } =require('../model')
const bcrypt = require("bcrypt")
const { msg,verify,jwtSign,verifyToken } =require('../utils')
exports.getuser=async(req,res)=>{
return {
  name:"lorre"
}
}

// Registered Users
exports.signup=async(req,res)=>{
  const { name , pw , mail } = req.body
  const option = {
    name,
    pw:bcrypt.hashSync(pw, 8),
    mail,
    smtp_url: process.env.SMTP_URL || "smtp.qq.com",
    smtp_port: process.env.SMTP_PORT || 465,
    smtp_pw: process.env.SMTP_PSW || ""
  }
  verify({name,pw,mail},['name','pw','mail'],res)
  const same = (await User.find({name})).length
  if(same) return msg.er('Users with the same name.')
  const empty = (await User.find()).length
  empty?option.group="user":option.group="admin"
  try {
    const addUser = await new User(option).save()
    if(addUser) return msg.sc(option)
  } catch (error) {
    return msg.er('Signup failed')
  }
}

// User login and return jwtToken
exports.login=async(req,res)=>{
  let { name , pw , token }=req.body
  const user = await User.findOne({name})
  // token auto login
  if(token){
    verifyToken(token,user._id,res)
    return msg.sc({token}) 
  }else{
    verify({name,pw}, ['name', 'pw'],res)
    token = jwtSign(user._id)
    return msg.sc({token})
  }
}

exports.updateConfig=async(req,res)=>{
  console.log(req.params);

  return {
    name:"lancer"
  }
}
