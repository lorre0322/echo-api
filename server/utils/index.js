const { msg } = require('./msg');
const jwt = require('jsonwebtoken')
const marked = require("marked");
const { gfmHeadingId } = require("marked-gfm-heading-id")
marked.use({
  mangle: false,
  headerIds: false,
});

const SECRET = process.env.SECRET || "ECHO"
function jwtSign(payload) {
  return jwt.sign({id:payload.toString()}, SECRET, { expiresIn: '7d' })
}

// 验证 Params
function verify(body, params,res) {
  for (const param of params) {
    if (!body[param]) {
      res.send({ok:false,cause:`${param} is not legal`})
    }
  }
}
// verify jwt token
function verifyToken(token,id,res) {
  console.log();
  const data = jwt.verify(token,SECRET,(err,decoded)=>{
    if (err) {
      res.send(msg.er('Token invalid'))
    }
    return decoded
  })
  if(data.id){
    const condition = data.id === id.toString()
    if (!condition){
      res.send(msg.er('Token failed'))
    }
  }
}

// verify permission
function verifyPermit(group,res) {
if(group!=="admin") res.send(msg.er("You don't have permission."))
}

// Convert the markdown in body to html
function convertListBody(datas) {
  for (const data of datas) {
    data.id = data._id
    delete data._id
    data.body = marked.parse(data.body)
  }
}

module.exports = { msg , verify , jwtSign ,verifyToken,verifyPermit ,convertListBody }