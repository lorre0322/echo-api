// const UAParser = require("ua-parser-js")
// // 静态地址库
// const IPDB = require('ipdb');
// const qqwry_ipdb = require('qqwry.ipdb');
// const ipdb = new IPDB(qqwry_ipdb);
// function getAgent(req) {
//   const parser = new UAParser(req.headers['user-agent']).getResult();
//   const add = ipdb.find(req.socket.remoteAddress).data
//   return {
//     browser: parser.browser.name,
//     os: parser.os.name,
//     ip: req.socket.remoteAddress,
//     place: add.city_name || add.region_name || add.country_name
//   }
// }
// module.exports = { getAgent }
"use strict";