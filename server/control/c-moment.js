const { msg,verify,verifyPermit,verifyToken ,convertListBody } = require('../utils');
const { User , Moment } = require('../model')

// Get moment from id
exports.getMoment=async(req,res)=>{
  const { id } = req.params
  console.log(id);
}

// Get moment list and convert to html
exports.getMomentList=async(req,res)=>{
  let { page , size , tag } = req.params
  tag?tag={tag}:tag={}
  try {
    const data = await Moment.find(tag)
    .sort({ _id: -1 })
    .skip((page) * size)
    .limit(size).lean()
    if(data){
      const count = await Moment.count()
      const max = Math.ceil(count / size)
      convertListBody(data)
      return msg.sc({data,count,max})
    }
    return msg.er("Not found moment.")
  } catch (error) {
    return msg.er("Not found moment.")
  }
}

// Record Moments
exports.addMoment=async(req,res)=>{
  const { user , token , date ,tag , body } = req.body
  verify({body},['body'],res)
  // Verify permission
  const { group,_id } = await User.findOne({user})
  verifyPermit(group,res)
  verifyToken(token,_id,res)
  // Default post time
  const time=new Date().getTime()
  date?date:date=Math.trunc(time/1000)
  try {
    const save = await new Moment({
      date,tag,body
    }).save()
    if(save) return msg.sc({date,tag,body})
  } catch (error) {
    return msg.er('Save failed')
  }
}

// Update moment
exports.updateMoment=async(req,res)=>{

}

// Delete moment from id
exports.delMoment=async(req,res)=>{
  const { user , token , id } = req.body
  verify({id},['id'],res)
  // Verify permission
  const { group,_id } = await User.findOne({user})
  verifyPermit(group,res)
  verifyToken(token,_id,res)
  try {
    const data=await Moment.findByIdAndRemove(id)
    if(!data) return msg.er("Not found this moment.")
    return msg.sc({data})
  } catch (error) {
    return msg.er("Delete moment error.")
  }
}
