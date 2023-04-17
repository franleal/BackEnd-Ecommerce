const { Router } = require('express')
const router = Router()

const { renderChat } = require('../controllers/chat.Controller')


router.get('/chat', renderChat)


module.exports = router