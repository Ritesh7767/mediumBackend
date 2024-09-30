/*
  Warnings:

  - You are about to drop the column `requestId` on the `FollowRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,requestedId]` on the table `FollowRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestedId` to the `FollowRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FollowRequest_userId_requestId_key";

-- AlterTable
ALTER TABLE "FollowRequest" DROP COLUMN "requestId",
ADD COLUMN     "requestedId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FollowRequest_userId_requestedId_key" ON "FollowRequest"("userId", "requestedId");
