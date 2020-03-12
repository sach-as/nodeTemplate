const { ulid } = require('ulid')
const db = require('../db')

const getUser = ({ email, password }) => {
  if (typeof email === 'undefined') {
    throw new Error('Please enter email')
  }
  if (typeof password === 'undefined') {
    throw new Error('Please enter password')
  }

  const user = db.users.find(x => x.email === email)
  if (user === null) {
    throw new Error('User does not exist')
  }

  return user
}

const getUserByEmail = email => {
  if (typeof email === 'undefined') {
    throw new Error('Please enter email')
  }

  return db.users.find(x => x.email === email)
}

const save = user => {
  db.users.push({ ulid: ulid(), ...user })
  console.log('USERS', JSON.stringify(db.users))
  return user
}

const all = () => {
  return db.users
}

module.exports = {
  all,
  save,
  getUser,
  getUserByEmail
}
