const express = require('express');
const orderitemController = require('../controler//orderitem');
const router  = express.Router();

router.get("/", orderitemController.getAllOrderitem)  
.get("/:id", orderitemController.getDetailOrderitem)
.post("/", orderitemController.createOrderitem)
.put("/:id", orderitemController.updateOrderitem)
.delete("/:id", orderitemController.deleteOrderitem);
module.exports = router;