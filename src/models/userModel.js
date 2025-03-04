const db = require('../config/db')

const createUser = (lname, fname, email, role, password) => {
    const stmt = db.prepare("INSERT INTO users (fname, lname, email, role, password) VALUES(?, ?, ?, ?, ?)");
    return stmt.run(fname, lname, email, role, password)
} 

const readUserByMail = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ? ");
    return stmt.get(email)
}

const readUserById = (id) => {
    const stmt = db.prepare("SELECT id, fname, lname, email, role FROM users WHERE id = ?")
    return stmt.get(id)
}


module.exports = {
	createUser,
	readUserByMail,
    readUserById
};

