const {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId,
    searchByName,
  } = require("../model/products");
  const commonHelper = require("../helper/common");
  
  const productsController = {
    getAllProduct: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const offset = (page - 1) * limit
        const sortby = req.query.sortby || "product_id"
        const sort = req.query.sort|| "ASC"
        let result = await selectAllProduct(sortby,sort,limit,offset)
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
      }
    },
  
    getDetailProduct: async (req, res) => {
      const id = Number(req.params.id);
      selectProduct(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createProduct: async (req, res) => {
      const {product_name,shop_name,price,color,product_image,category_id} = req.body;
      const {
        rows: [count],
      } = await countData();
      const product_id= Number(count.count) + 1;
      const data = {
        product_id,
        product_name,
        shop_name,
        price,color,
        product_image,
        category_id,
      };
      insertProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },
    updateProduct: async (req, res) => {
      try {
        const product_id = Number(req.params.id);
        const { product_name,shop_name,price,color,product_image,category_id} = req.body;
        const { rowCount } = await findId(product_id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        const data = {
          product_id,
          product_name,
          shop_name,
          price,
          color,
          product_image,
          category_id
        };
        updateProduct(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (req, res) => {
      try {
        const product_id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteProduct(product_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
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
          commonHelper.response(res, result.rows, 200, "succsess");
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        });
    },
  };
  
  module.exports = productsController;