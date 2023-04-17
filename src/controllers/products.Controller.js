const productController = {}
const product = require('../models/products.Model')

productController.getAllProduct =  async (req,res)=>{
    try{
        const allproduct = await product.find().lean()
        res.render('products',{
            allproduct,
            style:'products.css'
        })
    }catch(err){
        console.log(err)
    }
}

productController.editProductForm =  async (req,res)=>{
    const productSerched = await product.findById(req.params.id).lean()
    res.render('editProduct',{productSerched})
}


productController.updateProduct =  async (req,res)=>{
    const {title, description, price,thumbnail,category} = req.body
    await product.findByIdAndUpdate(req.params.id,{title, description, price,thumbnail,category}).lean()
    res.redirect('/products')
}

productController.deleteProduct =  async (req,res)=>{
    await product.findByIdAndDelete(req.params.id)
    res.redirect('/products')
}


module.exports = productController