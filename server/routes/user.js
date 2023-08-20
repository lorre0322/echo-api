const control = require("../control/c-user")
const user = [
	{
		method: "POST",
		url: "/init",
		handler: control.Init,

	},
	{
		method: "POST",
		url: "/login",
		handler: control.Login,
	},
]
module.exports = user
