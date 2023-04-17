
const user = require('../models/User')
const chat = require('../models/chat.Model')


module.exports = function(io){
    io.on('connection', async (socket) => {
        console.log('a user connected');

       let mensajes = await chat.find()
       socket.emit('load messages',mensajes)

        socket.on('new user', async(data, cb)=>{
            console.log(data)
            let emailUser = await user.findOne({data})
            const allUsers = await user.find()
            if(emailUser){
                cb(false)
 
            }else{
                cb(true)
                socket.nickname = data;
                io.sockets.emit('usernames', allUsers)
            }
        })

        socket.on('send message', async (message) =>{
            const newMsg = new chat({mensaje:message,username:socket.nickname})
            await newMsg.save()
            io.sockets.emit('new message',message)
        })

    });
}

 