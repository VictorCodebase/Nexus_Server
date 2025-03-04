const db = require('../config/db')

const createUser = (lname, fname, email, password) => {
    const stmt = db.prepare("INSERT INTO users (fname, lname, email, password) VALUES(?, ?, ?, ?)")
    return stmt.run(fname, lname, email, password)
} 

const readUsers = () => {
    const stmt = db.prepare("SELECT FROM users")
    return stmt.run()
}

module.exports = {
    createUser,
    readUsers
}