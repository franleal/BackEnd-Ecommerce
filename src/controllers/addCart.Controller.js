const addCartController = {}
const product = require('../models/products.Model')
const cart = require('../models/cart.Model')
var Cart = []

addCartController.addProductInCart =  async (req,res)=>{
    
    try{
        const { title, price, thumbnail, description,category,amount } = req.body
        console.log(req.body)
        const estaEnProducts = await product.findOne({title})
        console.log(estaEnProducts)

        const estaEnCart = await cart.findOne({title})
        console.log(estaEnCart)

        if(!estaEnProducts){
            req.flash('error_msg', 'product not found')
            console.log('product not found')
        }else if(!estaEnCart){
            
            const newProductInCart = new cart({ title, price, thumbnail, description,category,amount:1})

            await product.findByIdAndUpdate(
                estaEnProducts?._id,
                {inCart:true,title, price, thumbnail, description,category},
                {new:true}
            )
            .then((product) => {
                newProductInCart.save();
            })
            Cart.push(newProductInCart)
            res.redirect('/products')
        }
       
    }catch(err){
        console.log(err)
    }
}  

addCartController.getProductsInCart =  async (req,res)=>{
    try{
        const carProducts = await cart.find().lean()
        res.render('cart',{
            carProducts,
            style:'cart.css'
        })
    }catch(err){
        console.log(err)
    }
}


module.exports = addCartController