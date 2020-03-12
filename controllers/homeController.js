const userService = require('../services/user')

module.exports = app => {
  app.get('/', (req, res) => {
    const users = userService.all()
    console.log('USERS', JSON.stringify(users))
    res.render('index', { users })
  })
}
