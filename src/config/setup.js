const db = require("./db"); // Import database connection

function setupDb() {
	try {
		db.exec(`
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				fname TEXT NOT NULL,
				lname TEXT NOT NULL, 
				email TEXT UNIQUE NOT NULL,
				password TEXT NOT NULL
			);

		`); // TODO: Ensure password is hashed first
		console.log("Database setup completed.");
	} catch (error) {
		console.error("Database setup error:", error);
	}
}

module.exports = {setupDb};
