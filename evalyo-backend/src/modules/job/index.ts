import { Router } from "express";
import { uploadLocal } from "../../middlewares/multer";
import { createJob, uploadJobDescription } from "./jobController";

const jobRouter = Router();

jobRouter.get("/", (req, res) => {
  res.send("Job route");
});

jobRouter.post(
  "/upload",
  uploadLocal.single("jobDescription"),
  async (req, res) => {
    await uploadJobDescription(req, res);
  }
);

jobRouter.post("/create", async (req, res) => {
  await createJob(req, res);
});

export default jobRouter;
