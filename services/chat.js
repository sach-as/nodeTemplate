const { ulid } = require('ulid')
const db = require('../db')

const save = chat => {
  db.chat.push({ ulid: ulid(), ...chat })
  console.log('chat', JSON.stringify(db.chat))
  return chat
}

const chatWith = contactId => {
  return db.chat.filter(x => x.contactId === contactId && x.userId === 'a')
}

module.exports = {
  chatWith,
  save
}
