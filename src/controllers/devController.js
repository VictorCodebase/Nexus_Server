const dev = require("../models/devModel");

const resetTable = (req, res) => {
	const { table } = req.body;
    if (!table){
        res.status(400).json({message: "You must specify the table to be reset"})
    }

    if (dev.resetTable(table)){
        try{
            dev.recreateTables()

        }catch(error){
            res.status(400).json({message: "operation failed", error: error})
        }
    }
    else{
        res.status(400).json({ message: "operation failed", error: "Could not reset the specified table" });
    }

    res.status(200).json({message: `table "${table}" reset successfully`})

};

const resetTables = (req, res) => {
	if (dev.resetAllTables() === false) {
		res.status(500).json({ message: "operation failed" });
		return;
	}

	dev.recreateTables();

	res.status(200).json({ message: "tables reset successfully", instructions: "To recover reset data, run hit the /dev/restore immediately" });
};

const restoreTables = (req, res) => {
	const { backupFile } = req.body;

	if (!backupFile) {
		return res.status(400).json({ message: "backup file path is required" });
	}

	const success = dev.restoreTables(backupFile);

	if (!success) {
		return res.status(500).json({ message: "File restore failed, check logs for errors" });
	}

	res.status(200).json({ message: "Database successfully restored" });
};

module.exports = {
    resetTable,
	resetTables,
	restoreTables,
};
