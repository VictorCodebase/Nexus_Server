const db = require("../config/dbConfig");

const createPaper = (category_id, paper_name, file_url, description, meta = null) => {
	const deleted = 0;
	const stmt = db.prepare("INSERT INTO papers (category_id, paper_name, file_url, description, meta, deleted) VALUES(?,?,?,?,?,?)");

	return stmt.run(category_id, paper_name, file_url, description, meta, deleted);
};

const getPapers = (filters, offset = 0, limit = 30) => {
	let query = "SELECT * FROM papers WHERE 1=1";
	const params = [];

	if (limit > 30) {
		throw new Error("Hard limit of 30 documents a time hit");
	}

	try {
		if (filters.category) {
			query += " AND category_id = ?";
			params.push(filters.category);
		}

		if (filters.tag) {
			query += " AND tag_id = ?";
			params.push(filters.tag);
		}

		if (filters.q) {
			query += " AND (title LIKE ? OR description LIKE ?)";
			params.push(`%${filters.q}%`, `%${filters.q}%`);
		}

		// Pagination hard limit on 30 docs per query
		query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
		params.push(limit, offset);

		const stmt = db.prepare(query);
		return stmt.all(...params);
        
	} catch (error) {
		console.error("Error filtering papers:", error)
		return null;
	}
};

module.exports = {
	createPaper,
	getPapers,
};
