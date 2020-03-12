const userService = require('../services/user')

module.exports = (app, urlencodedParser) => {
  app.get('/register', (_, res) => {
    res.render('register', { errorMessage: undefined })
  })

  app.post('/register', urlencodedParser, (req, res) => {
    console.log('BODY:', JSON.stringify(req.body))

    try {
      const { email } = req.body
      const savedUser = userService.getUserByEmail(email)
      if (savedUser) {
        throw new Error('Already exist user email')
      }
      userService.save({ ...req.body })
      res.redirect('/')
    } catch (error) {
      console.log('ERROR:', error)
      res.render('register', { errorCode: 400, errorMessage: error.message })
    }
  })
}
