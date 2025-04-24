/*
  Warnings:

  - Added the required column `phone` to the `receiver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "receiver" ADD COLUMN     "phone" TEXT NOT NULL;
