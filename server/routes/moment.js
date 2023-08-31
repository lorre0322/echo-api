const control = require("../control/c-moment")

module.exports = () => {
  return [{
    method: "GET",
    url: "/mom/:id",
    handler: control.getMoment
  }, {
    method: "GET",
    url: "/mom/:page/:size/:tag",
    handler: control.getMomentList
  },{
    method: "POST",
    url: "/mom",
    handler: control.addMoment
  },{
    method: "PUT",
    url: "/mom",
    handler: control.updateMoment
  },{
    method: "DELETE",
    url: "/mom/:id",
    handler: control.delMoment
  }, ]
}