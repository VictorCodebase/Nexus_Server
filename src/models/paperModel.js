const db = require("../config/dbConfig")

const createPaper = (category_id, paper_name, file_url, description, meta=null) => {
    const deleted = 0
    const stmt = db.prepare("INSERT INTO papers (category_id, paper_name, file_url, description, meta, deleted) VALUES(?,?,?,?,?,?)");
    
    return stmt.run(category_id, paper_name, file_url, description, meta, deleted)
}

module.exports = {
    createPaper
}