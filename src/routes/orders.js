const { Router } = require('express')
const router = Router()

const { getOrders,addOrder,sendEmail } = require('../controllers/orders.Controller')

router.get('/orders',addOrder )

router.get('/ordersView',getOrders )

router.post('/ordersView',sendEmail )




module.exports = router