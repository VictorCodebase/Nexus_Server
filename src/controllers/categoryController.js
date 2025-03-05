const getCategories = () => {
	// TODO: implement getCategories method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

const addCategories = () => {
	category = req.query.category;

	console.log("got here")
	temp_res = { message: `Category ${category} cannot be added right now` };
	res.status(500).json(temp_res);
};

module.exports = {
	getCategories,
	addCategories,
};
