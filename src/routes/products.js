const express = require('express');
const productsController = require('../controler/products');
const router  = express.Router();

router.get("/", productsController.getAllProduct)
.get("/search", productsController.searchByName)  
.get("/:id", productsController.getDetailProduct)
.post("/", productsController.createProduct)
.put("/:id", productsController.updateProduct)
.delete("/:id", productsController.deleteProduct);
module.exports = router;