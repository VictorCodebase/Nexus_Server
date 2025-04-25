const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.header("Authorization");
	if (!authHeader) return res.status(401).json({ message: "Access denied, no authorization token provided." });

	token = authHeader.split(" ")[1]; // remove the bearer bit
	if (!token) {
		return res.status(401).json({ message: "Access denied, invalid token format." });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		console.log("Verified: ", req.user);
		next();
	} catch (err) {
		res.status(403).json({ message: "Invalid token" });
	}
};

const checkRole = (roles) => {
	return (req, res, next) => {
		const userRole = req.user.role.toLowerCase();

		if (!req.user || !roles.includes(userRole)) {
			return res.status(403).json({ message: "Forbidden: You do not have access" });
		}

		if (userRole === "author") {
			// TODO: Ensure the paper belongs to the author
			// const test_paper = {
			// 	authorId: 1,
			// };
			// if (!test_paper) {
			// 	return res.status(404).json({ message: "Requested resource does not exist" });
			// }

			// if (test_paper.authorId !== Number(req.params.id)) {
			// 	return res.status(403).json({ message: "Forbidden: You can only modify your papers" });
			// }

			next();
		} else if (userRole === "admin") {
			return next();
		} else {
			console.warn(`unregistered role detected: ${userRole}`)
			res.status(403).json({message: "forbidden: you do not have access"})
		}
	};
};

module.exports = {
	verifyToken,
	checkRole,
};
