/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `posts_content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_content_postId_key" ON "posts_content"("postId");

-- AddForeignKey
ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
