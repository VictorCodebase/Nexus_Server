
const uploadPaper = (req, res) => {
	// TODO: implement uploadPaper method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
}

const getPapers = (req, res) => {
	// TODO: implement getPaper method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
}

const getPaperById = (req, res) => {
	// TODO: implement getPaperById method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
}

const updatePaper = (req, res) => {
	// TODO: implement register method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
}

const deletePaper = (req, res) => {
    // TODO: implement deletePaper method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
}

module.exports = {
    uploadPaper,
    getPapers,
    getPaperById,
    updatePaper,
    deletePaper
}