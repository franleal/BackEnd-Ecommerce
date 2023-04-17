const express = require('express');
const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')

const path = require('path');
const {engine}  = require('express-handlebars')
const methodOverride =  require('method-override');
const session = require('express-session');
require("dotenv").config()
const flash = require('connect-flash')
const passport = require("passport");


//initialization
require('./config/passport')
const app = express();
require ('./db')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

require('./config/sockets')(io)

//settings

app.set('port', process.env.PORT || 8080);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',engine ({
    defaultLayout:'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials')
}))
app.set('view engine', '.hbs')

//middleware


app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session());
app.use(flash())  


//routes

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/addProducts'));
app.use(require('./routes/products'));
app.use(require('./routes/cart'))
app.use(require('./routes/chat'))
app.use(require('./routes/orders'))


//Global variables

app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
})




//static files
app.use(express.static(path.join(__dirname, 'public')));

//server is listening 
const server =  httpServer.listen(app.get('port'),() =>{
    console.log('server listening on port', app.get('port'));
})
server.on('error',err =>{
    console.log('Error en sercvidor',err)
})






