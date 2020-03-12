const userService = require('../services/user')

module.exports = app => {
  app.get('/login', (_, res) => {
    res.render('login')
  })

  app.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = userService.getUser({ email, password })
    res.render('index', user)
  })
}
