/*
  Warnings:

  - Made the column `gameId` on table `price` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `price` DROP FOREIGN KEY `Price_gameId_fkey`;

-- AlterTable
ALTER TABLE `price` MODIFY `gameId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
