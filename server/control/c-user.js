const { User } =require('../model')
const bcrypt = require("bcrypt")
const { msg,verify,jwtSign,verifyToken } =require('../utils')

// not done
exports.getuser=async(req,res)=>{

}

// Registered Users
exports.signup=async(req,res)=>{
  const { name , pw , mail } = req.body
  // Verify data
  verify({name,pw,mail},['name','pw','mail'],res)
  const option = {
    name,
    pw:bcrypt.hashSync(pw, 8),
    mail,
    smtp_url: process.env.SMTP_URL || "smtp.qq.com",
    smtp_port: process.env.SMTP_PORT || 465,
    smtp_pw: process.env.SMTP_PSW || ""
  }
  // Verify if it contains the same name
  const same = (await User.find({name})).length
  if(same) return msg.er('Users with the same name.')
  const empty = (await User.find()).length
  // Assign permissions
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
    return msg.sc({token,user:user.name})
  }
}

// Update user
exports.updateConfig=async(req,res)=>{
  
}
