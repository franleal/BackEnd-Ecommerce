
$(function(){

    const socket = io()

    const $messageForm=$('#message-form')
    const $messageBox=$('#message')
    const $chat = $('#chat')

    const $loginFrom = $('#login-from')
    const $email = $('#email')
    const $users = $('#usernames')
    //events

    $messageForm.submit(e => {
        e.preventDefault()
        socket.emit('send message', $messageBox.val())
        $messageBox.val('')
    })

    socket.on('new message',(message) =>{
        $chat.append(message + '<br/>')
    })

    $loginFrom.submit(e => {
        socket.emit('new user', $email.val(), data => {
            
        }) 
    })

    socket.on('usernames',(data) =>{
        let html = ''
        for (let i = 0; i< data.length; i++){
            html += `<p>${data[i]}</p>`

        }
        $users.html(html)
    })

    socket.on('load messages',data =>{
        for (let i = 0; i < data.length; i++){
            $chat.append(`<p><b>${data.username}</b>${data.mensaje}</p>`)
        } 
    })


})



