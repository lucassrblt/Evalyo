import AWS from "aws-sdk";
import { Request, Response } from "express";

// Configure AWS to use your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1", // specify your bucket's region
});

const s3 = new AWS.S3();

function uploadFileToS3(req: Request, res: Response) {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME || "your-bucket-name",
    Key: `videos/${Date.now()}-${file.originalname}`,
    Body: file.buffer, // File data
    ContentType: file.mimetype, // Preserve original file type
  };

  // Upload to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading to S3:", err);
      return res.status(500).send("Upload failed");
    }

    // Successful upload
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: { fileLocation: data.Location },
    });
  });
}

export default uploadFileToS3;
