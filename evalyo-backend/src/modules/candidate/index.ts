import { Router } from "express";
import { createCandidate } from "./candidateService";

const candidateRouter = Router();
candidateRouter.post("/", createCandidate);

export default candidateRouter;
