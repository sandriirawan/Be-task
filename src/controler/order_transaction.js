const {
    selectAllOrderTransaction,
    selectOrderTransaction,
    insertOrderTransaction,
    updateOrderTransaction,
    deleteOrderTransaction,
    countData,
    findId,

  } = require("../model/order_transaction");
  const commonHelper = require("../helper/common");
  
  const orderTransactionController = {
    getAllOrderTransaction: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const offset = (page - 1) * limit
        const sortby = req.query.sortby || "order_id"
        const sort = req.query.sort|| "ASC"
        let result = await selectAllOrderTransaction(sortby,sort,limit,offset)
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
  
    getDetailOrderTransaction: async (req, res) => {
      const order_id = Number(req.params.id);
      selectOrderTransaction(order_id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createOrderTransaction: async (req, res) => {
      const {customer_id, order_item_id} = req.body;
      const {
        rows: [count],
      } = await countData();
      const order_id = Number(count.count) + 1;
      const data = {
        order_id,
        order_item_id,
        customer_id,
      };
      await insertOrderTransaction(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },
    updateOrderTransaction: async (req, res) => {
        try {
          const order_id = Number(req.params.id);
          const { order_item_id ,customer_id} = req.body;
          const { rowCount } = await findId(order_id);
          if (!rowCount) {
            res.json({message: "ID is Not Found"})
          }
          const data = {
            order_id,
            order_item_id,
            customer_id,
        };
          updateOrderTransaction(data)
            .then((result) =>
              commonHelper.response(res, result.rows, 200, "Product updated")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },
    deleteOrderTransaction: async (req, res) => {
      try {
        const order_id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteOrderTransaction(order_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = orderTransactionController;