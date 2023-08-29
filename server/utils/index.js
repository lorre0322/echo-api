const { msg } = require('./msg');
const jwt = require('jsonwebtoken')

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

module.exports = { msg , verify , jwtSign ,verifyToken }