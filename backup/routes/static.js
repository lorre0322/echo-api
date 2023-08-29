const control = require("../control/c-static")

const static = [
  {
    method: "GET",
    url: "/:",
    handler: control.Static,
  },
  {
    method: "GET",
    url: "/img/:name",
    handler: control.getImg,
  },
  {
    method: "POST",
    url: "/img",
    handler: control.addImg,
  },
  {
    method: "GET",
    url: "/img/list/:page/:album?",
    handler: control.getImgList,
  },
  {
    method: "DELETE",
    url: "/img/:id",
    handler: control.delImg,
  },
]
module.exports = static
