import AWS from "aws-sdk";
import { Request, Response } from "express";

// Configure AWS to use your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1", // specify your bucket's region
});

const s3 = new AWS.S3();

const uploadFile = (
  file: Express.Multer.File,
  folder: string
): Promise<{
  success: boolean;
  message: string;
  data?: { fileLocation: string };
}> => {
  return new Promise((resolve, reject) => {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME || "your-bucket-name",
      Key: `${folder}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        reject({ success: false, message: "Upload failed" });
      } else {
        resolve({
          success: true,
          message: "File uploaded successfully",
          data: { fileLocation: data.Location },
        });
      }
    });
  });
};

export { uploadFile };
