const { User } =require('../model')
const bcrypt = require("bcrypt")
const { msg,verify,jwtSign,verifyToken } =require('../utils')

// not done
exports.getuser=async(req,res)=>{

}

// Registered Users
exports.signup=async(req,res)=>{
  const { user , pw , mail } = req.body
  // Verify data
  verify({user,pw,mail},['user','pw','mail'],res)
  const option = {
    user,
    pw:bcrypt.hashSync(pw, 8),
    mail,
  }
  // Verify if it contains the same name
  const same = (await User.find({user})).length
  if(same) return msg.er('Users with the same name.')
  const empty = (await User.find()).length
  // Assign permissions
  if(empty){
    option.group="user"
  }else{
    option.group="admin"
    option.smtp_url= process.env.SMTP_URL || "smtp.qq.com",
    option.smtp_port= process.env.SMTP_PORT || 465,
    option.smtp_pw= process.env.SMTP_PSW || ""
  }
  try {
    const addUser = await new User(option).save()
    if(addUser) return msg.sc(option)
  } catch (error) {
    return msg.er('Signup failed')
  }
}

// User login and return jwtToken
exports.login=async(req,res)=>{
  let { user , pw , token }=req.body
  const admin = await User.findOne({user:"lorre"})
  // token auto login
  try {   
    if(token){
      verifyToken(token,admin._id,res)
      return msg.sc({token,user})
    }else{
      verify({user,pw}, ['user', 'pw'],res)
      token = jwtSign(admin._id)
      const surePw = bcrypt.compareSync(pw, admin.pw)
      if(surePw) return msg.sc({token,user})
    }
    // return msg.sc({token,user})
  } catch (error) {
    return msg.er("Login failed.")
  }

}

// Update user
exports.updateConfig=async(req,res)=>{
  
}
