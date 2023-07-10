/*
  Warnings:

  - Added the required column `buildUrl` to the `Build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `build` ADD COLUMN `buildUrl` VARCHAR(191) NOT NULL;
