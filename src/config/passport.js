const passport = require('passport')
const localStrategy = require ('passport-local').Strategy

const User = require('../models/User')

passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'
},async (email,password,done)=> {

    const user = await User.findOne({email:email})
    if(!user){
        return done(null,false,{message:'Usuario no encontrado'})
    }else{
        const match = await user.matchPassword(password)
        if(match){
            return done(null,user)
        }else{
            return done(null,false,{message:'Contraseña incorrecta'})
        }
    }
    
}))

passport.serializeUser(function(user, done) {
    done(null, user.id); 
   
});


 passport.deserializeUser(function(id, done) {
    done(null, User);
 })
