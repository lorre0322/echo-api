"use strict";

var _require = require('../module'),
    User = _require.User,
    Moment = _require.Moment; // const { getAgent }=require('../utils/user-agent')


var _require2 = require('../utils/msg'),
    msg = _require2.msg;

var _require3 = require('../utils/verify'),
    verify = _require3.verify,
    verifyToken = _require3.verifyToken;

var _require4 = require('../utils/convert-body'),
    convertListBody = _require4.convertListBody;

exports.getMoment = function _callee(req, res) {
  var id, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Moment.findById(id));

        case 4:
          data = _context.sent;

          if (data) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", msg.er("not find this moment ."));

        case 7:
          return _context.abrupt("return", msg.sc({
            data: data
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", msg.er("not find this moment ."));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.getMomentList = function _callee2(req, res) {
  var _req$params, page, limit, _ref, page_limit, data, count, maxpage;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$params = req.params, page = _req$params.page, limit = _req$params.limit;

          if (limit) {
            _context2.next = 7;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            status: "admin"
          }));

        case 4:
          _ref = _context2.sent;
          page_limit = _ref.page_limit;
          limit = page_limit;

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(Moment.find().sort({
            _id: -1
          }).skip((page - 1) * limit).limit(limit).lean());

        case 9:
          data = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(Moment.count());

        case 12:
          count = _context2.sent;
          maxpage = Math.ceil(count / limit);
          convertListBody(data);
          return _context2.abrupt("return", msg.sc({
            data: data,
            maxpage: maxpage,
            count: count
          }));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.saveMoment = function _callee3(req, res) {
  var _req$body, date, tag, body, token, _ref2, _id, isToken, ver, data;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, date = _req$body.date, tag = _req$body.tag, body = _req$body.body, token = _req$body.token;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            status: "admin"
          }));

        case 3:
          _ref2 = _context3.sent;
          _id = _ref2._id;
          console.log(req.body);
          _context3.next = 8;
          return regeneratorRuntime.awrap(verifyToken(token, _id));

        case 8:
          isToken = _context3.sent;
          ver = verify({
            body: body
          }, ['body']);

          if (!(!isToken || ver)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", msg.er("You don't have permission ."));

        case 12:
          _context3.prev = 12;
          _context3.next = 15;
          return regeneratorRuntime.awrap(new Moment({
            date: date,
            tag: tag,
            body: body
          }).save());

        case 15:
          data = _context3.sent;
          return _context3.abrupt("return", msg.sc({
            data: data
          }));

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](12);
          return _context3.abrupt("return", msg.er("Can't save moment."));

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[12, 19]]);
};

exports.updateMoment = function _callee4(req, res) {
  var _req$body2, id, date, tag, body, token, _ref3, _id, isToken, ver, data;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, date = _req$body2.date, tag = _req$body2.tag, body = _req$body2.body, token = _req$body2.token;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            status: "admin"
          }));

        case 3:
          _ref3 = _context4.sent;
          _id = _ref3._id;
          _context4.next = 7;
          return regeneratorRuntime.awrap(verifyToken(token, _id));

        case 7:
          isToken = _context4.sent;
          ver = verify({
            body: body
          }, ['body']);

          if (!(!isToken || ver)) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", msg.er("You don't have permission ."));

        case 11:
          _context4.prev = 11;
          _context4.next = 14;
          return regeneratorRuntime.awrap(Moment.updateOne({
            _id: id
          }, {
            date: date,
            tag: tag,
            body: body
          }));

        case 14:
          data = _context4.sent;
          return _context4.abrupt("return", msg.sc({
            data: data
          }));

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](11);
          return _context4.abrupt("return", msg.er(_context4.t0));

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[11, 18]]);
};

exports.delMoment = function _callee5(req, res) {
  var id, token, config, isToken, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          token = req.body.token;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            status: "admin"
          }));

        case 4:
          config = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(verifyToken(token, config._id));

        case 7:
          isToken = _context5.sent;

          if (!(!token || !isToken)) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", msg.er("You don't have permission . "));

        case 10:
          _context5.next = 12;
          return regeneratorRuntime.awrap(Moment.findByIdAndRemove(id));

        case 12:
          data = _context5.sent;

          if (data) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return", msg.er("not found this moment."));

        case 15:
          return _context5.abrupt("return", msg.sc({
            data: data
          }));

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  });
};