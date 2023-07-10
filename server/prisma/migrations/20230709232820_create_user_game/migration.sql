/*
  Warnings:

  - Added the required column `userId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `game` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `shortDescription` TEXT NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
