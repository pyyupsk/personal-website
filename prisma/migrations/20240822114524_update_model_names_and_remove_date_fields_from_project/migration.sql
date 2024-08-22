/*
  Warnings:

  - You are about to drop the column `endDate` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "endDate",
DROP COLUMN "startDate";
