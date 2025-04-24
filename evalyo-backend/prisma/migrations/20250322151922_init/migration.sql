/*
  Warnings:

  - You are about to drop the `candidate_quiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "candidate_quiz" DROP CONSTRAINT "candidate_quiz_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "candidate_quiz" DROP CONSTRAINT "candidate_quiz_quizId_fkey";

-- DropTable
DROP TABLE "candidate_quiz";

-- CreateTable
CREATE TABLE "candidate_quizz" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateId" TEXT NOT NULL,
    "quizzId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "candidate_quizz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "candidate_quizz_candidateId_idx" ON "candidate_quizz"("candidateId");

-- CreateIndex
CREATE INDEX "candidate_quizz_quizzId_idx" ON "candidate_quizz"("quizzId");

-- AddForeignKey
ALTER TABLE "candidate_quizz" ADD CONSTRAINT "candidate_quizz_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_quizz" ADD CONSTRAINT "candidate_quizz_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
