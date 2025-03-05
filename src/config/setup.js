const db = require("./db"); // Import database connection

function setupDb() {
	try {
		db.exec(`
			CREATE TABLE IF NOT EXISTS institutions (
				institution_id INTEGER PRIMARY KEY AUTOINCREMENT,
				institution_name VARCHAR(255) NOT NULL,
				institution_country VARCHAR(255) NOT NULL
			);

			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				institution_id INTEGER NOT NULL,
				fname VARCHAR(255) NOT NULL,
				lname VARCHAR(255) NOT NULL, 
				username VARCHAR(255) NOT NULL,
				email VARCHAR(255) UNIQUE NOT NULL,
				role VARCHAR(50) NOT NULL,
				password TEXT NOT NULL,
				FOREIGN KEY (institution_id) REFERENCES institutions(institution_id) ON DELETE CASCADE
			);

			CREATE TABLE IF NOT EXISTS categories (
				category_id INTEGER PRIMARY KEY AUTOINCREMENT,
				category VARCHAR(100) UNIQUE NOT NULL
			);

			CREATE TABLE IF NOT EXISTS papers (
				paper_id INTEGER PRIMARY KEY AUTOINCREMENT,
				category_id INTEGER NOT NULL,
				paper_name VARCHAR(500) NOT NULL,
				description TEXT NOT NULL,
				FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE CASCADE
			);

			CREATE TABLE IF NOT EXISTS author_papers (
				rauthor_id INTEGER NOT NULL,
				rpaper_id INTEGER NOT NULL,
				PRIMARY KEY (rauthor_id, rpaper_id),
				FOREIGN KEY (rauthor_id) REFERENCES users(id) ON DELETE CASCADE,
				FOREIGN KEY (rpaper_id) REFERENCES papers(paper_id) ON DELETE CASCADE
			);
		`);
		console.log("Database setup completed.");
	} catch (error) {
		console.error("Database setup error:", error);
	}
}

module.exports = { setupDb };
