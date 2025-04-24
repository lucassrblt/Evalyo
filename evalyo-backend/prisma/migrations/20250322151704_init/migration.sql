/*
  Warnings:

  - You are about to drop the `receiver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receiver_quizz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "receiver_quizz" DROP CONSTRAINT "receiver_quizz_quizId_fkey";

-- DropForeignKey
ALTER TABLE "receiver_quizz" DROP CONSTRAINT "receiver_quizz_receiverId_fkey";

-- DropTable
DROP TABLE "receiver";

-- DropTable
DROP TABLE "receiver_quizz";

-- CreateTable
CREATE TABLE "candidate_quiz" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "candidate_quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "candidate_quiz_candidateId_idx" ON "candidate_quiz"("candidateId");

-- CreateIndex
CREATE INDEX "candidate_quiz_quizId_idx" ON "candidate_quiz"("quizId");

-- AddForeignKey
ALTER TABLE "candidate_quiz" ADD CONSTRAINT "candidate_quiz_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_quiz" ADD CONSTRAINT "candidate_quiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
