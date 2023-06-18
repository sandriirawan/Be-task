const express = require('express');
const router  = express.Router();
const customerController = require('../controler/customer');

router.get("/", customerController.getAllCustomer)
.get("/search", customerController.searchByName)    
.get("/:id", customerController.getDetailCustomer)
.post("/", customerController.createCustomer)
.put("/:id", customerController.updateCustomer)
.delete("/:id", customerController.deleteCustomer);

module.exports = router;