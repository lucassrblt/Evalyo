import { Router } from "express";
import { createQuizz, getQuizz, uploadQuizz } from "./quizzService";
import { Request, Response } from "express";
import { uploadLocal } from "../../middlewares/multer";

const quizzRouter = Router();

quizzRouter.get("/:id", async (req: Request, res: Response) => {
  await getQuizz(req, res);
});
quizzRouter.post("/", async (req: Request, res: Response) => {
  await createQuizz(req, res);
});

quizzRouter.post(
  "/upload",
  uploadLocal.single("pdf"),
  async (req: Request, res: Response) => {
    await uploadQuizz(req, res);
  }
);

export default quizzRouter;
