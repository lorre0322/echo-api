const {
  User
} = require("../module")
const {
  msg
} = require("../utils/msg")
const sendmail = require("../utils/sendmail")
const bcrypt = require("bcrypt")
const {
  SECRET,
  jwtSign,
  verify,
  verifyToken
} = require("../utils/verify")

exports.Init = async (req) => {
  const {
    username,
    password,
    email,
    website
  } = req.body

  const noEmpty = (await User.find()).length

  if (noEmpty) {
    return msg.er("Create failed ! Already have an admin .")
  } else {
    const option = {
      username,
      password: bcrypt.hashSync(password, 8),
      website: website || "echo blog",
      email,
      status: "admin",
      page_limit: 5,
      comment_limit: 5,
      smtp_url: process.env.SMTP_URL || "smtp.qq.com",
      smtp_port: process.env.SMTP_PORT || 465,
      smtp_psw: process.env.SMTP_PSW || ""

    }
    const admin = await new User(option).save()
    if (admin && option.smtp_psw) {
      await sendmail("注册成功", option.email, {})
    }
    return msg.sc({
      admin
    })
  }
}

exports.Login = async (req) => {
  let {
    username,
    password,
    token
  } = req.body

  const config = await User.findOne({
    status: "admin"
  })
  if (token) {
    const isToken = await verifyToken(token, config._id)
    if (!isToken) return await msg.er("Token invalid .")
    return msg.sc({
      token
    })
  } else {
    const usePassword = verify({
      username,
      password
    }, ['username', 'password'])
    const isUsername = username === config.username
    const isPassword = bcrypt.compareSync(password, config.password)

    if (usePassword || !isUsername || !isPassword) return await msg.er("username or password verify.")
    token = jwtSign({
      id: config._id.toString()
    }, SECRET, {
      expiresIn: '7d'
    })
    return msg.sc({
      token
    })
  }
}