/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");
