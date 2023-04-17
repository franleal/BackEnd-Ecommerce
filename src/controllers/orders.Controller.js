const ordersController = {}
const nodemailer = require('nodemailer')
const cart = require('../models/cart.Model')
const order = require('../models/orders.Model')
const user = require('../models/User')


ordersController.getsOrderProducts =  async (req,res)=>{
    try{
        
        
        const carProducts = await cart.find().lean()
        console.log(order.length)
        if (order.length > 0){
           let numOrders = order.length + 1
           const newOrder = new order({order:carProducts,numOrder:numOrders})
            newOrder.save()
        }else{
            const newOrder = new order({order:carProducts,numOrder:1})
            newOrder.save()
        }

    }
    catch(err){
        console.log(err)
    }
}

ordersController.getOrders =  async (req,res)=>{
    try{
        const allOrders = await order.find()
        console.log(allOrders)
         res.render('orders',{
             allOrders,
             style:'products.css'
         })

        
    }catch(err){
        console.log(err)
    }
   
}


ordersController.sendEmail =  async (req,res)=>{
    let email = await user.find()
    console.log(email)

    let transporter = nodemailer.createTransport({
        host:'smtp.ethereal.email',
        port:26,
        secure:false,
        auth:{
            user:'kaleb.hilpert@ethereal.email', 
            pass:'	n64S2eUvvNwvaf6t1Y'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let info = await transporter.sendMail({
        from:"'fran ecommerce' <kaleb.hilpert@ethereal.email>",
        to:`${email.email}`,
        subject:'orden de compra',
        text:'Su compra fue procesada con exito'
    })

    console.log(info)
    
}



module.exports = ordersController