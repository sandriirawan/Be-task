const {
    selectAllCategory,
    selectCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countData,
    findId,
    searchByName,
  } = require("../model/category");
  const commonHelper = require("../helper/common");
  
  const categoryController = {
    getAllCategory: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const offset = (page - 1) * limit
        const sortby = req.query.sortby || "category_id"
        const sort = req.query.sort|| "ASC"
        let result = await selectAllCategory(sortby,sort,limit,offset)
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
  
    getDetailCategory: async (req, res) => {
      const category_id = Number(req.params.id);
      selectCategory(category_id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createCategory: async (req, res) => {
      const {category_name,category_image} = req.body;
      const {
        rows: [count],
      } = await countData();
      const category_id = Number(count.count) + 1;
      const data = {
        category_id,
        category_name,
        category_image,
      };
      await insertCategory(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },
    updateCategory: async (req, res) => {
      try {
        const data = {
            category_id: Number(req.params.id),
            category_name: req.body.category_name,
            category_image: req.body.category_image,
        };
        updateCategory(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteCategory: async (req, res) => {
      try {
        const category_id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteCategory(category_id)
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
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        });
    },
  };
  
  module.exports = categoryController;