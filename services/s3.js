require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const aws = require("aws-sdk");

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.S3_BUCKET_REGION;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

function uploadFile(file, folder, contentType) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: "eff-photos",
    Body: fileStream,
    Key: folder + file.filename,
    ACL: "public-read",
    ContentType: contentType,
  };
  return s3.upload(uploadParams).promise();
}

// const uploadFile = () => {
//   fs.readFile(fileName, (err, data) => {
//      if (err) throw err;
//      const params = {
//          Bucket: 'testBucket', // pass your bucket name
//          Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
//          Body: JSON.stringify(data, null, 2)
//      };
//      s3.upload(params, function(s3Err, data) {
//          if (s3Err) throw s3Err
//          console.log(`File uploaded successfully at ${data.Location}`)
//      });
//   });
// };

exports.uploadFile = uploadFile;
