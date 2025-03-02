const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) return res.status(401).json({ message: "Access denied, no authorization token provided." });

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next(); //! How the hell does this work
		// I think next is a callback function passed in the arguments
	} catch (err) {
		res.status(403).json({ message: "Invalid token" });
	}
};

const checkRole = (roles) => {
	return (req, res, next) => {
		if (!req.user || !roles.includes(req.user.role)) {
			return res.status(403).json({ message: "Forbidden: You do not have access" });
		}
		next();
	};
};

module.exports = {
	verifyToken,
	checkRole,
};
