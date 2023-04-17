const{Schema,model}= require('mongoose')


const chatSchema = new Schema({
    mensaje: { type: String, max: 100},
    username: { type: String, }
},
    {
        timestamps: true
    }
)

module.exports = model('Chat',chatSchema)