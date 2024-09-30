/*
  Warnings:

  - The primary key for the `FollowRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FollowRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FollowRequest" DROP CONSTRAINT "FollowRequest_pkey",
DROP COLUMN "id";
