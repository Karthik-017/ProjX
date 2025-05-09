/*
  Warnings:

  - Added the required column `folderUrl` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "folderUrl" TEXT NOT NULL;
