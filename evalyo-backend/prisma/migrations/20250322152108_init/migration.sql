/*
  Warnings:

  - You are about to drop the column `quizId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the `quiz` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quizzId` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "candidate_quizz" DROP CONSTRAINT "candidate_quizz_quizzId_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_quizId_fkey";

-- DropIndex
DROP INDEX "question_quizId_idx";

-- AlterTable
ALTER TABLE "candidate_quizz" ALTER COLUMN "score" DROP NOT NULL;

-- AlterTable
ALTER TABLE "question" DROP COLUMN "quizId",
ADD COLUMN     "quizzId" TEXT NOT NULL;

-- DropTable
DROP TABLE "quiz";

-- CreateTable
CREATE TABLE "quizz" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "quizz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "question_quizzId_idx" ON "question"("quizzId");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_quizz" ADD CONSTRAINT "candidate_quizz_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
