const db = require('better-sqlite3')

export default function update_test(name){
    stmt = db.prepare("INSTER INTO Test (name) VALUES(?)");
    result = stmt.run(name)
}
