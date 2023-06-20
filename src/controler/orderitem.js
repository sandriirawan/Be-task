const {
    selectAllOrderitem,
    selectOrderitem,
    insertOrderitem,
    updateOrderitem,
    deleteOrderitem,
    countData,
    findId,

  } = require("../model/orderitem");
  const commonHelper = require("../helper/common");
  
  const orderitemController = {
    getAllOrderitem: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const offset = (page - 1) * limit
        const sortby = req.query.sortby || "quantity"
        const sort = req.query.sort|| "ASC"
        let result = await selectAllOrderitem(sortby,sort,limit,offset)
        const {rows: [count]} = await countData()
        const totalData = parseInt(count.count)
        const totalPage = Math.ceil(totalData/limit)
        const pagination ={     
              currentPage : page,
              limit:limit,
              totalData:totalData,
              totalPage:totalPage
            }
        commonHelper.response(res, result.rows, 200, "get data success",pagination)
      } catch (error) {
        console.log(error);
        commonHelper.response(res, false, 400, "get data failed")
      }
    },
  
    getDetailOrderitem: async (req, res) => {
      const order_item_id = Number(req.params.id);
      selectOrderitem(order_item_id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createOrderitem: async (req, res) => {
      const {product_id,quantity} = req.body;
      const {
        rows: [count],
      } = await countData();
      const order_item_id = Number(count.count) + 1;
      const data = {
        order_item_id,
        product_id,
        quantity,
      };
      await insertOrderitem(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "created")
        )
        .catch((err) => res.send(err));
    },
    updateOrderitem: async (req, res) => {
        try {
          const order_item_id = Number(req.params.id);
          const {product_id,quantity} = req.body;
          const { rowCount } = await findId( order_item_id);
          if (!rowCount) {
            res.json({message: "ID is Not Found"})
          }
          const data = {
            order_item_id,
            product_id,
            quantity,
        };
          updateOrderitem(data)
            .then((result) =>
              commonHelper.response(res, result.rows, 200, "updated")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },
    deleteOrderitem: async (req, res) => {
      try {
        const order_item_id = Number(req.params.id);
        const { rowCount } = await findId(order_item_id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteOrderitem(order_item_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = orderitemController;