const msg={
  sc:(e)=> {
    e.msg="success"
    return e
  },
  er:(e)=> {
    return{
      msg:"failed",
      reason:e
    }
  }
}

module.exports={ msg }