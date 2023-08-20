"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var fs = require('fs');

var path = require('path');

var _require = require('../utils/content-type'),
    getType = _require.getType;

var _require2 = require('../module'),
    User = _require2.User,
    Album = _require2.Album;

var _require3 = require('../utils/msg'),
    msg = _require3.msg;

var _require4 = require('../utils/verify'),
    verify = _require4.verify,
    verifyToken = _require4.verifyToken;

var _require5 = require('../utils/convert-body'),
    ConvertImgData = _require5.ConvertImgData;

exports.Static = function (req, res) {
  var _getType = getType(req),
      contType = _getType.contType,
      pathName = _getType.pathName;

  res.type("".concat(contType, ";charset=utf-8")); // return data

  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) {
      res.send("ʕ ˙Ⱉ˙ ʔ file not found !");
    }

    res.send(data);
  });
};

exports.getImg = function _callee(req, res) {
  var name, data, base64, dataBUffer;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.params.name;
          name = path.basename(decodeURI(req.url), '.png');
          res.type("image/png;charset=utf-8");
          _context.next = 5;
          return regeneratorRuntime.awrap(Album.findOne({
            name: name
          }));

        case 5:
          data = _context.sent;
          base64 = data.img_data.replace(/^data:image\/\w+;base64,/, "");
          dataBUffer = Buffer.from(base64, 'base64');
          return _context.abrupt("return", dataBUffer);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addImg = function _callee2(req, res) {
  var _req$body, name, album, desc, img_data, token, _ref, _id, isToken, ver, same, data;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, album = _req$body.album, desc = _req$body.desc, img_data = _req$body.img_data, token = _req$body.token;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            status: "admin"
          }));

        case 3:
          _ref = _context2.sent;
          _id = _ref._id;
          _context2.next = 7;
          return regeneratorRuntime.awrap(verifyToken(token, _id));

        case 7:
          isToken = _context2.sent;

          if (isToken) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", msg.er("You don't have permission ."));

        case 10:
          ver = verify({
            name: name,
            img_data: img_data
          }, ['name', 'img_data']);

          if (!ver) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", msg.er("Data is not legal . "));

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(Album.findOne({
            name: name
          }));

        case 15:
          same = _context2.sent;

          if (!same) {
            _context2.next = 20;
            break;
          }

          return _context2.abrupt("return", msg.er("Had same name image ."));

        case 20:
          album ? album : album = (_readOnlyError("album"), life);
          data = new Album({
            name: name,
            album: album,
            desc: desc,
            img_data: img_data
          }).save();
          return _context2.abrupt("return", msg.sc({
            data: data
          }));

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getImgList = function _callee3(req) {
  var _req$params, page, album, limit, data, count, list, maxpage;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$params = req.params, page = _req$params.page, album = _req$params.album;
          limit = 6;
          album ? album = {
            album: album
          } : album = {};
          _context3.next = 5;
          return regeneratorRuntime.awrap(Album.find(album, {
            img_data: 0
          }).sort({
            _id: -1
          }).skip((page - 1) * limit).limit(limit).lean());

        case 5:
          data = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(Album.count());

        case 8:
          count = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(Album.distinct("album"));

        case 11:
          list = _context3.sent;
          maxpage = Math.ceil(count / limit);
          ConvertImgData(data);
          return _context3.abrupt("return", msg.sc({
            data: data,
            album: list,
            maxpage: maxpage,
            count: count
          }));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.delImg = function _callee4(req, res) {
  var id, token, config, isToken, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          token = req.body.token;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            status: "admin"
          }));

        case 4:
          config = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(verifyToken(token, config._id));

        case 7:
          isToken = _context4.sent;

          if (!(!token || !isToken)) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", msg.er("You don't have permission ."));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(Album.findByIdAndRemove(id));

        case 12:
          data = _context4.sent;

          if (data) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", msg.er("not found this image."));

        case 15:
          return _context4.abrupt("return", msg.sc({
            data: data
          }));

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
};