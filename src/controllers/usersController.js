const usersController = {}
const User = require( "../models/User");
const passport = require("passport");

usersController.renderUserRegister = (req,res)=>{
    res.render('register')
}

usersController.addUser = async(req,res)=>{
    console.log(req.body)
    const {email,nombre, password,confirm_password,direccion,edad,telefono,foto} = req.body
    const errors = [];
    if (password!= confirm_password){
        errors.push({message:'las constraseñas no coinciden'})
    }
    if (password.length < 6){
        errors.push({message:'la contraseña debe tener al menos 6 caracteres'})
    }
    if(errors.length > 0){
        res.render('register',{
            errors,
            email,
            password,
            confirm_password,
            direccion,
            edad,
            telefono,
            foto
        })
    }else{
        const emailUser = await User.findOne({email:email})
        if(emailUser){
            req.flash('success_msg', 'Este email ya esta registrado')
            res.redirect("/register")
        }
        const newUser = new User({ email, password, nombre, direccion, edad, telefono, foto })
        //cifro la contraseña y la guardo en la base de datos
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save()
        req.flash('success_msg', 'El usuario fue registrado exitosamente')
        res.redirect("/")
    }
}


usersController.renderloginUser = (req,res)=>{
    res.render('login')
}

usersController.loginUser = passport.authenticate('local',{
    failureRedirect:'/',
    successRedirect:'/products',
    failureFlash:true

})

usersController.logOut = (req,res)=>{
    
}



module.exports = usersController