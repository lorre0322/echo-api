const { User, Moment } = require('../module')
const { getAgent }=require('../utils/user-agent')
const { msg }=require('../utils/msg')
const { verify, verifyToken } = require('../utils/verify')
const { convertListBody } =require('../utils/convert-body')

exports.getMoment = async (req,res)=>{
  const {id}=req.params

  try {
    const data=await Moment.findById(id)
    if(!data) return msg.er("not find this moment .")
    return msg.sc({data})
  } catch (error) {
    return msg.er("not find this moment .")
  }
}

exports.getMomentList = async (req,res)=>{
  let { page,limit }=req.params

  if(!limit){
    const { page_limit } = await User.findOne({ status: "admin" })
    limit=page_limit
  }
  const data = await Moment.find()
  .sort({ _id: -1 })
  .skip((page - 1) * limit)
  .limit(limit).lean()
  const count = await Moment.count()
  const maxpage = Math.ceil(count / limit)
  convertListBody(data)
  return msg.sc({data,maxpage,count})
}

exports.saveMoment = async (req,res)=>{
  const { date, tag, body, token } = req.body
  const { _id } = await User.findOne({ status: "admin" })

  console.log(req.body);
  const isToken = await verifyToken(token, _id)
  const ver = verify({ body }, ['body'])
  if (!isToken || ver) return msg.er("You don't have permission .")
  try {
    const data=await new Moment({ date, tag, body}).save()
    return msg.sc({ data })
  } catch (error) {
    return msg.er("Can't save moment.")
  }
}

exports.updateMoment = async (req,res)=>{
  const { id, date, tag, body, token } = req.body
  const { _id } = await User.findOne({ status: "admin" })

  const isToken = await verifyToken(token, _id)
  const ver = verify({ body }, ['body'])
  if (!isToken || ver) return msg.er("You don't have permission .")
  try {
    const data=await Moment.updateOne({ _id: id }, { date, tag, body })
    return msg.sc({ data })
  } catch (error) {
    return msg.er(error)
  }
}

exports.delMoment = async (req,res)=>{
  const { id } = req.params
  const { token }=req.body

  const config = await User.findOne({ status: "admin" })
  const isToken = await verifyToken(token, config._id)
  if(!token || !isToken) return msg.er("You don't have permission . ")
  const data=await Moment.findByIdAndRemove(id)
  if(!data) return msg.er("not found this moment.")
  return msg.sc({data})
}