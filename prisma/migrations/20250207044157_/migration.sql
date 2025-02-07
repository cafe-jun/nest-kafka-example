-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopularPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PopularPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PopularPost_date_idx" ON "PopularPost"("date");

-- AddForeignKey
ALTER TABLE "PopularPost" ADD CONSTRAINT "PopularPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
