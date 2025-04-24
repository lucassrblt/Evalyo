import { Router } from "express";
import uploadFileToS3 from "./videoService";
import { Request, Response } from "express";
import { upload } from "../../middlewares/multer";

const videoRouter = Router();

videoRouter.get("/", (req, res) => {
  res.send("Hello from video module");
});

videoRouter.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    uploadFileToS3(req, res);
  }
);

export default videoRouter;
