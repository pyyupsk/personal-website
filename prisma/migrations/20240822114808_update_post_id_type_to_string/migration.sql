/*
  Warnings:

  - The primary key for the `blog_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- AlterTable
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "blog_posts_id_seq";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "postId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
