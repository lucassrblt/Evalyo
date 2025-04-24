import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import userRouter from "./modules/user";
import quizzRouter from "./modules/quizz";
import candidateRouter from "./modules/candidate";
import mailRouter from "./modules/mails";
import videoRouter from "./modules/video";
import companyRouter from "./modules/company";
import taskRouter from "./modules/task";
import jobRouter from "./modules/job";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/quizz", quizzRouter);
app.use("/api/candidates", candidateRouter);
app.use("/api/mail", mailRouter);
app.use("/api/videos", videoRouter);
app.use("/api/company", companyRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/jobs", jobRouter);

app.listen(port, async () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});
