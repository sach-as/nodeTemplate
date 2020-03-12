const moment = require('moment');
const chatService = require('../services/chat')

module.exports = app => {
  app.get('/chat', (req, res) => {
    const { contactId } = req.query
    console.log('PARAMS', contactId)
    const chat = chatService.chatWith(contactId)
    console.log('Chats', JSON.stringify(chat))
    res.render('chat', { chat, moment })
  })
}
