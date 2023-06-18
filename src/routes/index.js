const express = require('express')
const router = express.Router()
const CategoryRouter = require('../routes/category')
const ProductsRouter = require('../routes/products')
const CustomerRouter = require('../routes/customer')
const OrderTransactionRouter = require('../routes/order_transaction')
const OrderitemRouter = require('../routes/orderitem')

router.use('/category', CategoryRouter)
router.use('/products', ProductsRouter)
router.use('/customer', CustomerRouter)
router.use('/ordertransaction', OrderTransactionRouter)
router.use('/orderitem', OrderitemRouter)

module.exports = router