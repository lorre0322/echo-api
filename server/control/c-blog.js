const { msg , verify , verifyPermit , verifyToken ,convertListBody } = require('../utils')
const { User , Blog } =  require('../model');
exports.getBlog=async(req,res)=>{
  const { id } = req.params
  console.log(id);
  const data = await Blog.findOne({title:id})
  return msg.sc({data})
}

// Get blog list and convert to html
exports.getBlogList=async(req,res)=>{
  let { page , size , categ } = req.params
  categ?categ={categ}:categ={}
  console.log(req.params);
  try {
    const data = await Blog.find(categ)
    .sort({ _id: -1 })
    .skip((page) * size)
    .limit(size).lean()
    console.log(data);
    if(data){
      const count = await Blog.count()
      const max = Math.ceil(count / size)
      convertListBody(data)
      return msg.sc({data,count,max})
    }
    return msg.er("Not found moment.")
  } catch (error) {
    return msg.er("Not found moment.")
  }
}

// Upload blog
exports.addBlog=async(req,res)=>{
  let { user , token , title , date , img , categ , tag , body , is_page } = req.body
  verify({title,body},['title','body'],res)
  // Verify if it contains the same name
  const same = (await Blog.findOne({title}))
  if(same) return msg.er("Already have a same name post.")
  // Verify permission
  const { group,_id } = await User.findOne({user})
  verifyPermit(group,res)
  verifyToken(token,_id,res)
  // Default post time
  const time=new Date().getTime()
  date?date:date=Math.trunc(time/1000)
  is_page?is_page:is_page=false
  const params={title,date,categ,tag,img,body,is_page}
  img?img:delete(params.img)
  try {
    const save = await new Blog(params).save()
    if(save) return msg.sc(params)
  } catch (error) {
    return msg.er('Save failed')
  }
}

// Delete post from id
exports.updateBlog=async(req,res)=>{

}

// Delete post from id
exports.delBlog=async(req,res)=>{
  const { user , token , id } = req.body
  verify({id},['id'],res)
  // Verify permission
  const { group,_id } = await User.findOne({user})
  verifyPermit(group,res)
  verifyToken(token,_id,res)
  try {
    const data=await Blog.findByIdAndRemove(id)
    if(!data) return msg.er("Not found this post.")
    return msg.sc({data})
  } catch (error) {
    return msg.er("Delete post error.")
  }
}