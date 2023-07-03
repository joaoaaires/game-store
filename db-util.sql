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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
