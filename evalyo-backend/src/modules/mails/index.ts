import { Router } from "express";
import { sendMail } from "./mailService";

const mailRouter = Router();

mailRouter.get("/", (req, res) => {
  res.send("Hello World");
});

mailRouter.post("/send", sendMail);

export default mailRouter;
