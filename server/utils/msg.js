const msg={
  sc:(e)=> {
    e.ok=true
    return e
  },
  er:(e)=> {
    return{
      ok:false,
      cause:e
    }
  }
}

module.exports={ msg }