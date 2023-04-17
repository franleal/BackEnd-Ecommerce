const{Schema,model}= require('mongoose')


const ProductSchema = new Schema({
    title: { type: String, required: true, max: 100 , unique:true},
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
    description: { type: String, max: 100 },
    category: { type: String, required: true, max: 100 },
    inCart: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
)

module.exports = model('products',ProductSchema)