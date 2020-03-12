const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')

const app = express()

// Controllers
const userController = require('./controllers/userController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const homeController = require('./controllers/homeController')
const chatController = require('./controllers/chatController')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs')
app.use('/assets', express.static('stuff'))
app.use('/assets', express.static('node_modules/bootstrap/dist/css'))
app.use('/assets', express.static('node_modules/bootstrap/dist/js'))
app.use('/assets', express.static('node_modules/jquery/dist'))
app.use('/assets', express.static('node_modules/font-awesome'))
app.use('/assets', express.static('node_modules/socket.io-client'))

app.get('/contact', function (req, res) {
  console.log(req.query)
  res.render('contact', { qs: req.query })
})

app.post('/contact', urlencodedParser, function (req, res) {
  console.log(req.body)
  res.render('contact-success', { data: req.body })
})

app.get('/profile', function (req, res) {
  var data = { hobbies: ['football', 'dance', 'Cricket'] }
  res.render('profile', { person: 'req.params.name', data: data })
})

// User controller
userController(app)
loginController(app)
registerController(app, urlencodedParser)
homeController(app)
chatController(app)

const server = app.listen(3000)
console.log('Listing port http://localhost:3000')

const io = socket(server)
io.on('connection', (socket) => {
  console.log('made socket connections', socket.id)

  // Handle chat event
  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })

  socket.on('typingremove', data => {
    socket.broadcast.emit('typingremove', data)
  })
})
