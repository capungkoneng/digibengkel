const AWS = require("aws-sdk");
let multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const S3 = new AWS.S3(awsConfig);

const uploadM = multer({
  // storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      //prevent the upload
      var newError = new Error("File type is incorrect must pdf file");
      // newError.name = "MulterError";
      cb(newError, false);
    }
  },
});

//upload to s3
const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: `${Date.now().toString()}.pdf`,
      Body: fileData,
    };
    console.log(params);
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
};

module.exports = {
  uploadM,
  uploadToS3,
};
