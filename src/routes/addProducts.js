const { Router } = require('express')
const router = Router()

const { getProductUpdate, addProduct, getProduct,getProductForm, getAllProducts, deleteAll, deleteProduct  } = require('../controllers/addProducts.Controller')

router.get('/addProducts', getProductForm)

router.post('/addProducts',addProduct)



module.exports = router