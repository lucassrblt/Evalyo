import { Router } from "express";
import { createCompany, getCompany } from "./companyService";
import { upload } from "../../middlewares/multer";
import { Request, Response } from "express";

const companyRouter = Router();

companyRouter.get("/", async (req: Request, res: Response) => {
  await getCompany(req, res);
});

companyRouter.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response) => {
    await createCompany(req, res);
  }
);

export default companyRouter;
