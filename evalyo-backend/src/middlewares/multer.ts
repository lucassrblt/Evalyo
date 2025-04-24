import multer from "multer";

const upload = multer({
  // Option 1: Store in memory (good for direct upload to S3)
  storage: multer.memoryStorage(),

  // Optional: File size and type limits
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    // Only allow certain file types
    console.log("file.mimetype", file.mimetype);
    console.log("file", file);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "webm",
      "text/plain",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadLocal = multer({ storage });

export { upload, uploadLocal };
