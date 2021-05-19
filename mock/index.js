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
const proxy = {
  'POST /cart/brands/list': (req, res) => {
    return res.send({
      code: 10000,
      data: {
        list: [
          {
            id: 1,
            name: 'brand 1',
          },
          {
            id: 2,
            name: 'brand 2',
          },
        ],
      },
    });
  },
  'POST /cart/goods/list': (req, res) => {
    return res.send({
      code: 10000,
      data: {
        page: 1,
        total: 18,
        perPage: '10',
        totalPage: 2,
        list: [
          {
            id: 1,
            name: 'goods 1',
            image: 'http://sdfsdf.com/sdsdf.jpg',
            price: {
              unit: 'CNY',
              sign: '￥',
              value: 98.456,
            },
          },
        ],
      },
    });
  },
};

module.exports = proxy;
