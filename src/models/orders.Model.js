const{Schema,model}= require('mongoose')


const orderSchema = new Schema({
    order:[{
        type:Object,
        ref:'Cart',
        required: true
    }],
    numOrder: { type: Number, required: true, max: 100},
    estado: { type: String, default: 'generada'},
    // email: { type: String, required: true}
},
    {
        timestamps: true
    }
)

module.exports = model('Order',orderSchema)