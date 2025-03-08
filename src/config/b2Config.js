const {S3Client} = require("@aws-sdk/client-s3")
require("dotenv").config()

const s3 = new S3Client({
	endpoint: process.env.B2_ENDPOINT,
	region: "us-west-004",
	credentials: {
		accessKeyId: process.env.B2_KEY_ID,
		secretAccessKey: process.env.B2_APPLICATION_KEY,
	},
});

module.exports = s3