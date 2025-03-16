const db = require("../config/dbConfig");

const createPaper = (category_id, paper_name, file_url, description, meta = null, tags = null) => {
	const deleted = 0;
	const stmt = db.prepare("INSERT INTO papers (category_id, paper_name, file_url, description, meta, deleted) VALUES(?,?,?,?,?,?)");

	const result = stmt.run(category_id, paper_name, file_url, description, meta, deleted);
	if (!result.changes) return null;

	const paper_id = result.lastInsertRowid;

	try {
		if (tags.length > 0) {
			const tagStmt = db.prepare("INSERT INTO paper_tags (paper_id, tag_id) VALUES (?, ?)");
			const insertMany = db.transaction((tags) => {
				for (const tag_id of tags) {
					tagStmt.run(paper_id, tag_id);
				}
			});
			insertMany(tags);
		}
	} catch (error) {
		throw new Error();
	}

	return paper_id;
};

const getPapers = (filters, offset = 0, limit = 30) => {
	let query = `
        SELECT DISTINCT papers.* 
        FROM papers 
        LEFT JOIN paper_tags ON papers.paper_id = paper_tags.paper_id
    `;
	const params = [];

	if (limit > 30) {
		throw new Error("Hard limit of 30 documents a time hit");
	}

	let conditions = ["1=1"];

	try {
		if (filters.id){
			query += " AND papers.paper_id= ?";
			params.push(Number(filters.id))
		}

		if (filters.category) {
			query += " AND category_id = ?";
			params.push(Number(filters.category));
		}

		if (filters.tag) {
			conditions.push("paper_tags.tag_id = ?");
			params.push(Number(filters.tag));
		}

		if (filters.q) {
			query += " AND (title LIKE ? OR description LIKE ?)";
			params.push(`%${String(filters.q)}%`, `%${String(filters.q)}%`);
		}

		query += ` WHERE ${conditions.join(" AND ")}`;

		// Pagination hard limit on 30 docs per query
		query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
		params.push(limit, offset);

		const stmt = db.prepare(query);

		return stmt.all(...params);
	} catch (error) {
		console.error("Error filtering papers:", error);
		return null;
	}
};


module.exports = {
	createPaper,
	getPapers,
};
