import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import jwt from "jsonwebtoken";
import cuuid from "cuid";
import {
  extractTextFromPDF,
  removeFile,
} from "../../utils/files/filesServices";
import sendPrompt from "../prompt/promptService";

const createQuizz = async (req: Request, res: Response) => {
  const { title, description, questions, expiration, userId } = req.body;

  try {
    if (!title || !questions || !userId) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all required fields" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const id = cuuid();
    let expirationLink = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: expiration,
    });
    const newQuizz = await prisma.quizz.create({
      data: {
        id,
        title,
        description,
        expirationLink,
        userId,
        questions: {
          create: questions.map((q: any) => ({
            content: q.question,
            time: q.time,
            answers: {
              create: q.reponses.map((answer: string, index: number) => ({
                content: answer,
                correct: index === q.answer,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    res.status(201).json(newQuizz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

const getQuizz = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const quizz = await prisma.quizz.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!quizz) {
      return res.status(404).json({ error: "Quizz not found" });
    }

    if (quizz && quizz.expirationLink) {
      const isExpired = !verifyExpiration(quizz.expirationLink);

      if (isExpired) {
        return res
          .status(401)
          .json({ success: "False", error: "Quizz expired" });
      }
    }

    return res.status(200).json(quizz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: "False", error: "Failed to get quizz" });
  }
};

const verifyExpiration = (link: string) => {
  try {
    jwt.verify(link, process.env.JWT_SECRET as string);
  } catch (err) {
    return false;
  }
  return true;
};

const getQuizzByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const quizz = await prisma.quizz.findMany({
      where: {
        userId: userId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return res.status(200).json({ success: true, data: quizz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to get quizz" });
  }
};

const uploadQuizz = async (req: Request, res: Response) => {
  try {
    const { file } = req;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    if (!file.path) {
      return res
        .status(400)
        .json({ success: false, message: "File path is missing" });
    }

    const data = await extractTextFromPDF(file.path);
    if (!data || !data.text) {
      return res
        .status(400)
        .json({ success: false, message: "No text found in PDF" });
    }

    // Send chtgpt prompt
    const context = `
    You are a quiz generator. Analyze the following job description and create a quiz based on it.
    
    Return the result as a JSON object with the following structure:
    
    {
      "id": string,                // unique uuid for the quiz
      "title": string,              // title of the quiz
      "description": string,        // short description of the quiz
      "expiration": string,         // quiz expiration time (e.g., "200m")
      "questions": [
        {
          "id": string,                // unique uuid for the question  
          "question": string,       // the question content
          "reponses": string[],     // an array of 3 possible answers
          "time": number,           // time allowed in seconds (e.g., 30)
          "answer": number          // index (0, 1, or 2) of the correct answer in the reponses array
        }
      ]
    }
    
    Generate at least 2 questions. The questions should be directly inspired by the content of the job description and test relevant understanding.
    
    Job Description:
    ${data.text}
    `;

    const result = await sendPrompt(context);
    removeFile(file.path);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to upload quizz" });
  }
};

export { createQuizz, getQuizz, getQuizzByUserId, uploadQuizz };
