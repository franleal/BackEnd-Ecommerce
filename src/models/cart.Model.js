const{Schema,model}= require('mongoose')


const cartSchema = new Schema({
    title: { type: String, required: true, max: 100 , unique:true},
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
    description: { type: String, max: 100 },
    category: { type: String, required: true, max: 100 },
    amount:{ type: Number, required: true, max: 100},
},
    {
        timestamps: true
    }
)

module.exports = model('Cart',cartSchema)