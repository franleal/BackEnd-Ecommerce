const mongoose = require('mongoose')
const config = require('./config/config')


mongoose.connect(config.db.cnxStr,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
})
    .then(db=>console.log("database conectada exitosamente"))
    .catch(err=>console.log(err))