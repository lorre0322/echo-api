const control = require("../control/c-static")

module.exports = () => {
  return [{
    method: "GET",
    url: "/:",
    handler: control.Static
  }, {
    method: "GET",
    url: "/img/:name",
    handler: control.getImg
  }, {
    method: "GET",
    url: "/img/list/:page/:album?",
    handler: control.getImgList
  },{
    method: "POST",
    url: "/img",
    handler: control.addImg
  },{
    method: "DELETE",
    url: "/img/:id",
    handler: control.delImg
  }, ]
}