// function listFormat(req, json) {
//   const { page = 1, size = 10 } = req.method === 'GET' ? req.query : req.body;
//   const menus = require(json);
//   return {
//     code: 200,
//     data: {
//       page: page,
//       size: size,
//       totalpage: menus.length,
//       list: menus.slice((page - 1) * size, page * size),
//     },
//   };
// }
const proxy = {};

module.exports = proxy;
