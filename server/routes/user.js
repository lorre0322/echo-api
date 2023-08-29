const control = require("../control/c-user")

module.exports = () => {
  return [{
    method: "POST",
    url: "/user/:id",
    handler: control.getuser
  }, {
    method: "POST",
    url: "/signup",
    handler: control.signup
  }, {
    method: "POST",
    url: "/login",
    handler: control.login
  },{
    method: "GET",
    url: "/user/:id",
    handler: control.updateConfig
  }]
}