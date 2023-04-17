const{Schema,model}= require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    email: {type: String, required:true, unique: true},
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: String, required: true },
    telefono: { type: String, required: true },
    foto: { type: String}

},{
    timestamps:true
})

//cifrar contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt) 
}

//compa contrañe y con la cifrada
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User',UserSchema)