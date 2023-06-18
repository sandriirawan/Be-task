const express = require('express');
const router  = express.Router();
const orderTransactionController = require('../controler/order_transaction');

router.get("/", orderTransactionController.getAllOrderTransaction)  
.get("/:id", orderTransactionController.getDetailOrderTransaction)
.post("/", orderTransactionController.createOrderTransaction)
.put("/:id", orderTransactionController.updateOrderTransaction)
.delete("/:id", orderTransactionController.deleteOrderTransaction);

module.exports = router;