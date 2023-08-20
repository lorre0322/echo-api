const control = require("../control/c-moment")

const user = [
  {
    method: "GET",
    url: "/moment/:id",
    handler: control.getMoment,
  },
  {
    method: "GET",
    url: "/moment/list/:page/:limit",
    handler: control.getMomentList,
  },
  {
    method: "POST",
    url: "/moment",
    handler: control.saveMoment,
  },
  {
    method: "PUT",
    url: "/moment",
    handler: control.updateMoment,
  },
  {
    method: "DELETE",
    url: "/moment/:id",
    handler: control.delMoment,

  },
]

module.exports = user