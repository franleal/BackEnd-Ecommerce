const ordersController = {}
const nodemailer = require('nodemailer')
const order = require('../models/orders.Model')
const user = require('../models/User')
const cart = require('../models/cart.Model')




ordersController.addOrder =  async (req,res)=>{
    
    const items = await cart.find()
    var cant = await order.count() 

    try{
        if(cant > 0){
            cant = cant + 1
            const objects = new order({
                numOrder:cant,
                objects:items
            })
            const newOrder = await objects.save()
            console.log('Orden creada con exito')
            console.log(newOrder)
        }else{
            cant = 1
            const objects = new order({
                numOrder:cant,
                objects:items
            })
            const newOrder = await objects.save()
            console.log('Orden creada con exito')
            console.log(newOrder)
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