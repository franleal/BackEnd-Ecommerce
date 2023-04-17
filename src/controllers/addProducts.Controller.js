const addProductController = {}
const product = require('../models/products.Model')

addProductController.getProductForm =  async (req,res)=>{
    try {
        res.render('addProducts')
    }
    catch (error) {
        console.log(error)
    }
}

addProductController.addProduct =  async (req,res)=>{
    try {
        const { title, price, thumbnail, description,category } = req.body
        const errors = []
        if(!title){
            errors.push({ msg: 'Title is required' })
        }
        if(!price){
            errors.push({ msg: 'price is required' })
        }
        if(!thumbnail){
            errors.push({ msg: 'thumbnail is required' })
        }
        if(!description){
            errors.push({ msg: 'description is required' })
        }
        if(!category){
            errors.push({ msg: 'category is required' })
        } 

        if(errors.length>0){
            res.render('addProducts',{errors,title,price,thumbnail,description,category})
        }else{
            const newProduct = new product({ title, price, thumbnail, description,category })
            console.log('product saved',newProduct)
            req.flash('success_msg', 'product saved successfully')
            await newProduct.save()
            res.redirect('/addProducts')
            
            
        } 
        res.render('addProducts')
    }
    catch (error) {
        console.log(error)
    }

    addProductController.deleteProduct =  async (req,res)=>{}

    addProductController.deleteAll =  async (req,res)=>{}

    



}


module.exports = addProductController