const { Router } = require('express')
const router = Router()

const { addProductInCart,getProductsInCart } = require('../controllers/addCart.Controller')

router.post('/addInCart/:id',addProductInCart)

router.get('/cart',getProductsInCart)



module.exports = router