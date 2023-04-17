const { Router } = require('express')
const router = Router()

const {  getAllProduct,editProductForm,updateProduct,deleteProduct } = require('../controllers/products.Controller')

router.get('/products', getAllProduct)

router.get('/products/edit/:id', editProductForm)

router.put('/products/edit/:id', updateProduct)


router.delete('/products/delete/:id', deleteProduct)





module.exports = router