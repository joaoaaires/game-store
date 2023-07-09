-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isDev` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperationalSystems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `shortDescription` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `actor` VARCHAR(191) NOT NULL,
    `avatarUrl` VARCHAR(191) NOT NULL,
    `headerUrl` VARCHAR(191) NOT NULL,
    `uurest` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GamesOnCategories` (
    `gameId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`gameId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GamesOnSystems` (
    `gameId` INTEGER NOT NULL,
    `operationalSystemsId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`gameId`, `operationalSystemsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screenshots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `screenUrl` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Build` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `buildNumber` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddRow
INSERT INTO `category` (`id`, `description`, `createAt`, `updateAt`) VALUES
	(1, 'Terror', '2023-06-30 13:35:01.527', '2023-06-30 13:35:01.527'),
	(2, 'Aventura', '2023-06-30 13:35:08.833', '2023-06-30 13:35:08.833'),
	(3, 'Ação', '2023-06-30 13:35:14.165', '2023-06-30 13:35:14.165'),
	(4, 'RPG', '2023-06-30 13:35:20.146', '2023-06-30 13:35:20.146');

-- AddRow
INSERT INTO `operationalsystems` (`id`, `description`, `createAt`, `updateAt`) VALUES
	(1, 'Windows', '2023-06-30 13:35:28.427', '2023-06-30 13:35:28.427'),
	(2, 'macOS', '2023-06-30 13:35:33.759', '2023-06-30 13:35:33.759'),
	(3, 'Linux', '2023-06-30 13:35:41.542', '2023-06-30 13:35:41.542'),
	(4, 'chromeOS', '2023-06-30 13:35:48.349', '2023-06-30 13:35:48.349');

-- AddForeignKey
ALTER TABLE `GamesOnCategories` ADD CONSTRAINT `GamesOnCategories_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GamesOnCategories` ADD CONSTRAINT `GamesOnCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GamesOnSystems` ADD CONSTRAINT `GamesOnSystems_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GamesOnSystems` ADD CONSTRAINT `GamesOnSystems_operationalSystemsId_fkey` FOREIGN KEY (`operationalSystemsId`) REFERENCES `OperationalSystems`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Screenshots` ADD CONSTRAINT `Screenshots_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Build` ADD CONSTRAINT `Build_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
