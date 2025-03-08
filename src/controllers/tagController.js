const { createTag } = require("../models/tagModel");

const getTags = () => {
	// TODO: implement getTags method
	message = req.query.message;
	temp_res = { message: "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

const addTags = (req, res) => {
	// TODO: implement addTags method
	const name = req.query.name;
	createTag
	temp_res = { message: "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

module.exports = {
	getTags,
	addTags,
};
