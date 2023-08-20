"use strict";

var token = localStorage.getItem("e-token") || "",
    login = function login() {
  var e, o, t, s;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e = $("username").value, o = $("password").value;
          t = localStorage.getItem("e-token") || "";
          _context.next = 4;
          return regeneratorRuntime.awrap(_req.post("/login", {
            username: e,
            password: o,
            token: t
          }));

        case 4:
          s = _context.sent;
          "success" === s.msg ? (localStorage.setItem("e-token", s.token), msg.sc("login success !")) : msg.er(s.reason);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
},
    logout = function logout() {
  localStorage.removeItem("e-token"), msg.er("logout success .");
};

token && login(), $("po").onclick = function () {
  localStorage.getItem("e-token") || "" ? (localStorage.removeItem("e-token"), msg.er("logout success .")) : login();
};