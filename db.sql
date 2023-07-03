-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           8.0.31 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.2.0.6576
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para oppai
CREATE DATABASE IF NOT EXISTS `oppai` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `oppai`;

-- Copiando estrutura para tabela oppai.build
CREATE TABLE IF NOT EXISTS `build` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameId` int NOT NULL,
  `buildNumber` int NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Build_gameId_fkey` (`gameId`),
  CONSTRAINT `Build_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.build: ~1 rows (aproximadamente)
INSERT INTO `build` (`id`, `gameId`, `buildNumber`, `description`, `createAt`, `updateAt`) VALUES
	(1, 11, 100, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634');

-- Copiando estrutura para tabela oppai.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.category: ~4 rows (aproximadamente)
INSERT INTO `category` (`id`, `description`, `createAt`, `updateAt`) VALUES
	(1, 'Terror', '2023-06-30 13:35:01.527', '2023-06-30 13:35:01.527'),
	(2, 'Aventura', '2023-06-30 13:35:08.833', '2023-06-30 13:35:08.833'),
	(3, 'Ação', '2023-06-30 13:35:14.165', '2023-06-30 13:35:14.165'),
	(4, 'RPG', '2023-06-30 13:35:20.146', '2023-06-30 13:35:20.146');

-- Copiando estrutura para tabela oppai.game
CREATE TABLE IF NOT EXISTS `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatarUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `headerUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uurest` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.game: ~1 rows (aproximadamente)
INSERT INTO `game` (`id`, `title`, `shortDescription`, `description`, `actor`, `avatarUrl`, `headerUrl`, `uurest`, `createAt`, `updateAt`) VALUES
	(11, 'God of War', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend dui. Praesent tempus imperdiet est, eu placerat dolor fringilla at. Suspendisse et urna ut nibh tempor lacinia. Maecenas ut felis purus. In sodales eu mi nec sollicitudin. Sed id condimentum sapien, vitae lobortis augue. Morbi eleifend nisi metus, non suscipit enim lobortis eget. Sed vestibulum erat sit amet augue sollicitudin cursus.', 'Joao Aires', 'http://localhost:3333/uploads/header/469d9021-026c-413f-98ec-4828b83d3c0a.png', 'http://localhost:3333/uploads/avatar/0156475d-3a8d-4bad-9676-9d0f5b7b5a47.jpeg', 'god-of-war', '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634');

-- Copiando estrutura para tabela oppai.gamesoncategories
CREATE TABLE IF NOT EXISTS `gamesoncategories` (
  `gameId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`gameId`,`categoryId`),
  KEY `GamesOnCategories_categoryId_fkey` (`categoryId`),
  CONSTRAINT `GamesOnCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `GamesOnCategories_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.gamesoncategories: ~2 rows (aproximadamente)
INSERT INTO `gamesoncategories` (`gameId`, `categoryId`, `createAt`, `updateAt`) VALUES
	(11, 1, '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634'),
	(11, 3, '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634');

-- Copiando estrutura para tabela oppai.gamesonsystems
CREATE TABLE IF NOT EXISTS `gamesonsystems` (
  `gameId` int NOT NULL,
  `operationalSystemsId` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`gameId`,`operationalSystemsId`),
  KEY `GamesOnSystems_operationalSystemsId_fkey` (`operationalSystemsId`),
  CONSTRAINT `GamesOnSystems_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `GamesOnSystems_operationalSystemsId_fkey` FOREIGN KEY (`operationalSystemsId`) REFERENCES `operationalsystems` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.gamesonsystems: ~2 rows (aproximadamente)
INSERT INTO `gamesonsystems` (`gameId`, `operationalSystemsId`, `createAt`, `updateAt`) VALUES
	(11, 1, '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634'),
	(11, 3, '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634');

-- Copiando estrutura para tabela oppai.operationalsystems
CREATE TABLE IF NOT EXISTS `operationalsystems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.operationalsystems: ~4 rows (aproximadamente)
INSERT INTO `operationalsystems` (`id`, `description`, `createAt`, `updateAt`) VALUES
	(1, 'Windows', '2023-06-30 13:35:28.427', '2023-06-30 13:35:28.427'),
	(2, 'macOS', '2023-06-30 13:35:33.759', '2023-06-30 13:35:33.759'),
	(3, 'Linux', '2023-06-30 13:35:41.542', '2023-06-30 13:35:41.542'),
	(4, 'chromeOS', '2023-06-30 13:35:48.349', '2023-06-30 13:35:48.349');

-- Copiando estrutura para tabela oppai.price
CREATE TABLE IF NOT EXISTS `price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameId` int DEFAULT NULL,
  `price` decimal(65,30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Price_gameId_fkey` (`gameId`),
  CONSTRAINT `Price_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.price: ~1 rows (aproximadamente)
INSERT INTO `price` (`id`, `gameId`, `price`) VALUES
	(1, 11, 1.500000000000000000000000000000);

-- Copiando estrutura para tabela oppai.screenshots
CREATE TABLE IF NOT EXISTS `screenshots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameId` int NOT NULL,
  `screenUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Screenshots_gameId_fkey` (`gameId`),
  CONSTRAINT `Screenshots_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.screenshots: ~3 rows (aproximadamente)
INSERT INTO `screenshots` (`id`, `gameId`, `screenUrl`, `createAt`, `updateAt`) VALUES
	(1, 11, 'http://localhost:3333/uploads/screen/f1c7d9c0-cd79-4e3a-826d-b16e585fc2a3.png', '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634'),
	(2, 11, 'http://localhost:3333/uploads/screen/faa1a5b5-312a-4bf8-b3b3-6626c1c1b442.png', '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634'),
	(3, 11, 'http://localhost:3333/uploads/screen/bad72d0f-0f0e-447b-8e7f-15b270745c0e.png', '2023-07-03 02:50:31.634', '2023-07-03 02:50:31.634');

-- Copiando estrutura para tabela oppai.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDev` tinyint(1) NOT NULL DEFAULT '0',
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai.user: ~2 rows (aproximadamente)
INSERT INTO `user` (`id`, `name`, `email`, `password`, `isDev`, `createAt`, `updateAt`) VALUES
	(1, 'João Aires', 'jantonioayres@gmail.com', '123321', 1, '2023-06-30 16:36:02.090', '2023-06-30 16:36:02.090'),
	(2, 'joaoaaires', 'jantonioayres@hotmail.com', '123321', 0, '2023-07-01 16:52:24.929', '2023-07-01 16:52:24.929');

-- Copiando estrutura para tabela oppai._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela oppai._prisma_migrations: ~2 rows (aproximadamente)
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('1e75457b-2142-476c-92e4-0d2165fe28f9', '9b1ccac57ec82b986867a7604873e6a89935d45b989ba64b373f51926d62bb52', '2023-06-30 16:41:25.481', '20230630164125_update_lenght_game', NULL, NULL, '2023-06-30 16:41:25.459', 1),
	('f790d8a7-4dfe-42fc-8cf9-3b0d832169aa', '27fda2ca9d61c6476212c791cc18f020ad48893d1d7c8d2254a4d03d0779e2d0', '2023-06-30 16:33:05.253', '20230630163304_init', NULL, NULL, '2023-06-30 16:33:04.942', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
