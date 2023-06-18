const express = require('express');
const router  = express.Router();
const categoryController = require('../controler/category');

router.get("/", categoryController.getAllCategory )
.get("/search", categoryController.searchByName)    
.get("/:id", categoryController.getDetailCategory)
.post("/", categoryController.createCategory)
.put("/:id", categoryController.updateCategory)
.delete("/:id", categoryController.deleteCategory);

module.exports = router;