"use strict";

var page = 1,
    maxpage = 1;

var delMoment = function delMoment(e) {
  var t;
  return regeneratorRuntime.async(function delMoment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!window.confirm("你是否删除：" + e + " ? ")) {
            _context.next = 5;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_req.del("/moment/".concat(e), {
            token: localStorage.getItem("e-token") || ""
          }));

        case 3:
          t = _context.sent;
          "success" === t.msg ? (msg.sc("Delete success ! "), getlist()) : msg.er(t.reason || "Delete failed .");

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
},
    getlist = function getlist() {
  var e;
  return regeneratorRuntime.async(function getlist$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_req.get("/moment/list/".concat(page, "/8")));

        case 2:
          e = _context2.sent;
          maxpage = e.maxpage, $("nowpage").innerText = page, $("maxpage").innerText = maxpage, $("list").innerHTML = "", e.data.forEach(function (e) {
            var t = document.createElement("div"),
                a = document.createElement("input"),
                n = document.createElement("span");
            a.value = e.id, n.innerText = e.body, a.onclick = function () {
              a.select(), document.execCommand("copy"), a.blur();
            }, n.onclick = function () {
              delMoment(e.body);
            }, t.appendChild(a), t.appendChild(n), $("list").appendChild(t);
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

getlist(), $("prev").onclick = function () {
  page > 1 && page--, getlist();
}, $("next").onclick = function () {
  page < maxpage && page++, getlist();
};