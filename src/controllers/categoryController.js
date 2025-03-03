const getCategories = () => {
	// TODO: implement getCategories method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

const addCategories = () => {
	// TODO: implement addCategories method
	message = req.query.message;
	temp_res = { message: "Forbidden: You cannot add new categories" };
	res.status(403).json(temp_res);
};

module.exports = {
	getCategories,
	addCategories,
};
