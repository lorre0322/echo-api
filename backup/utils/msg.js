const msg={
  sc:(e)=> {
    e.ok=true
    return e
  },
  er:(e)=> {
    return{
      ok:false,
      reason:e
    }
  }
}

module.exports={ msg }