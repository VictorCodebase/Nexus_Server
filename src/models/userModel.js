const db = require('../config/db')

const createUser = (lname, fname, email, password) => {
    const stmt = db.prepare("INSERT INTO users (fname, lname, role, email, password) VALUES(?, ?, ?, ?, ?)")
    return stmt.run(fname, lname, email, password)
} 

const readUser = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    return stmt.get(email, password)
}


module.exports = {
    createUser,
    readUser
}