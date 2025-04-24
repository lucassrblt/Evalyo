import prisma from "../../utils/prismaClient";
import { Request, Response } from "express";

const createCandidate = async (req: Request, res: Response) => {
  try {
    const { firstName, email, phone, lastName, quizzId } = req.body;
    const existingCandidate = await prisma.candidate.findFirst({
      where: {
        email,
      },
    });

    if (existingCandidate) {
      res.status(400).json({ error: "Candidate already exists" });
    }

    const quiz = await prisma.quizz.findFirst({
      where: {
        id: quizzId,
      },
    });

    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
    }

    const newCandidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    const candidateQuiz = await prisma.candidateQuizz.create({
      data: {
        status: "pending",
        candidateId: newCandidate.id,
        quizzId: quizzId,
      },
    });

    res.status(201).json(newCandidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create receiver" });
  }
};

export { createCandidate };
