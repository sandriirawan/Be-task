const {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
    searchByName,
  } = require("../model/customer");
  const commonHelper = require("../helper/common");
  
  const customerController = {
    getAllCustomer: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const offset = (page - 1) * limit
        const sortby = req.query.sortby || "customer_id"
        const sort = req.query.sort|| "ASC"
        let result = await selectAllCustomer(sortby,sort,limit,offset)
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
  
    getDetailCustomer: async (req, res) => {
      const customer_id = Number(req.params.id);
      selectCustomer(customer_id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createCustomer: async (req, res) => {
      const {customer_name,email,phone_number,address} = req.body;
      const {
        rows: [count],
      } = await countData();
      const customer_id = Number(count.count) + 1;
      const data = {
        customer_id,
        customer_name,
        email,
        phone_number,
        address,
      };
      await insertCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "created")
        )
        .catch((err) => res.send(err));
    },
    updateCustomer: async (req, res) => {
        try {
          const customer_id = Number(req.params.id);
          const { customer_name,email,phone_number,address} = req.body;
          const { rowCount } = await findId(customer_id);
          if (!rowCount) {
            res.json({message: "ID is Not Found"})
          }
          const data = {
            customer_id,
            customer_name,
            email,
            phone_number,
            address,
        };
          updateCustomer(data)
            .then((result) =>
              commonHelper.response(res, result.rows, 200, "updated")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },
    deleteCustomer: async (req, res) => {
      try {
        const customer_id = Number(req.params.id);
        const { rowCount } = await findId(customer_id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteCustomer(customer_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },

    searchByName: async (req, res) => {
      const search = req.query.keyword;
      await searchByName(search)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        });
    },
  };
  
  module.exports = customerController;