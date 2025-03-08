const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./b2Config");

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.B2_BUCKET_NAME,
		key: function (req, file, cb) {
			const filename = `research-papers/${Date.now()}-${file.originalname}`;
			cb(null, filename);
		},
	}),
	limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload