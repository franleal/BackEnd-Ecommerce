const { Router } = require('express')
const router = Router()

const { getOrders,getsOrderProducts,sendEmail } = require('../controllers/orders.Controller')

router.get('/orders',getsOrderProducts )

router.get('/ordersView',getOrders )

router.post('/ordersView',sendEmail )




module.exports = router