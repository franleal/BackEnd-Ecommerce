const chatController = {}

chatController.renderChat =  async (req,res)=>{
    try {
        res.render('chat',{
            style:'chat.css'
        })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = chatController