"use strict";

function uf(e, t, n) {
  return regeneratorRuntime.async(function uf$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (n = JSON.stringify(n), fetch("" + e, {
            method: t,
            headers: {
              "Content-Type": "application/json"
            },
            body: n
          }).then(function (e) {
            return e.json();
          })));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _req = {
  get: function get(e) {
    return regeneratorRuntime.async(function get$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(uf(e, "GET"));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  post: function post(e, t) {
    return regeneratorRuntime.async(function post$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(uf(e, "POST", t));

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  put: function put(e, t) {
    return regeneratorRuntime.async(function put$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(uf(e, "PUT", t));

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  del: function del(e, t) {
    return regeneratorRuntime.async(function del$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(uf(e, "DELETE", t));

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
},
    $ = function $(e) {
  return document.getElementById(e);
},
    MSG = function MSG(e, t) {
  var n = document.createElement("div"),
      s = document.createElement("span");
  s.className = "msg ".concat(e), s.innerHTML = t || e, n.appendChild(s), $("msg").appendChild(n), setTimeout(function () {
    n.parentElement.removeChild(n);
  }, 2e3);
},
    msg = {
  sc: function sc(e) {
    return MSG("suc", "🥰 " + e);
  },
  er: function er(e) {
    return MSG("err", "😮‍💨 " + e);
  }
},
    token = localStorage.getItem("e-token"),
    login = function login(e) {
  var t;
  return regeneratorRuntime.async(function login$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_req.post("/login", e));

        case 2:
          t = _context6.sent;
          "success" === t.msg ? (localStorage.setItem("e-token", t.token), msg.sc("Login success .")) : msg.er(t.reason || "Login failed .");

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

token && login({
  token: token
});