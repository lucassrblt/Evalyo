-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateQuizzId" TEXT NOT NULL,
    "attchment" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_candidateQuizzId_fkey" FOREIGN KEY ("candidateQuizzId") REFERENCES "candidate_quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
