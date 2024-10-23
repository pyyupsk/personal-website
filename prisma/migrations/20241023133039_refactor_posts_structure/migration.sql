/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `blog_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content";

-- DropTable
DROP TABLE "blog_posts";
