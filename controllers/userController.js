const users = [
  { item: 'get milk' },
  { item: 'Walk dog' },
  { item: 'Kick some' }
]

const bodyParser = require('body-parser')
// const mongoose = require('mongoose');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// mongoose.connect('mongodb+srv://raj:Jumbo@1612@rajdb-ifh3d.mongodb.net/test');

module.exports = app => {
  app.get('/user', (req, res) => {
    res.render('registration')
  })

  app.post('/user', urlencodedParser, (req, res) => {
    users.push(req.body)
    res.json(users)
  })

  app.delete('/user/:user', (req, res) => {
    res.render('user')
  })
}
