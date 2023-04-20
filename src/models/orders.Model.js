const{Schema,model}= require('mongoose')


const orderSchema = new Schema({
    title:{ type: String, default: 'orden de compra'},
    objects:[{
        _id:false,
        type: String
    }],
    numOrder: { type: Number, max: 100},
    estado: { type: String, default: 'generada'},
    // email: { type: String, required: true}
},
    {
        timestamps: true
    }
)

module.exports = model('Order',orderSchema)