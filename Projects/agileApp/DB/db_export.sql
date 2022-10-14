-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for 2101db
CREATE DATABASE IF NOT EXISTS `2101db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `2101db`;

-- Dumping structure for table 2101db.activity
CREATE TABLE IF NOT EXISTS `activity` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_name` varchar(50) DEFAULT NULL,
  `activity_desc` varchar(50) DEFAULT NULL,
  `activity_dur` time DEFAULT NULL,
  `activity_datetime` datetime DEFAULT NULL,
  `task_id` int(5) unsigned zerofill NOT NULL,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `UNIQ_TASK_TIME` (`activity_datetime`,`task_id`),
  KEY `FK_activity_tasks` (`task_id`),
  CONSTRAINT `FK_activity_tasks` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table 2101db.sprints
CREATE TABLE IF NOT EXISTS `sprints` (
  `sprint_id` int(11) NOT NULL AUTO_INCREMENT,
  `sprint_name` varchar(50) NOT NULL DEFAULT '',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `sprint_status` varchar(50) DEFAULT 'Inactive',
  PRIMARY KEY (`sprint_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table 2101db.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `priority` varchar(50) NOT NULL DEFAULT '',
  `tag` varchar(50) DEFAULT NULL,
  `assignee` varchar(50) DEFAULT NULL,
  `story_point` int(11) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `sprint_id` int(11) DEFAULT NULL,
  `total_time` time DEFAULT '00:00:00',
  PRIMARY KEY (`task_id`),
  KEY `SPRINT_FK` (`sprint_id`),
  CONSTRAINT `SPRINT_FK` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`sprint_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `priority_cons` CHECK (`priority` = 'High' or `priority` = 'Medium' or `priority` = 'Low'),
  CONSTRAINT `status_cons` CHECK (`status` in ('To Do','In Progress','To Review','Completed'))
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COMMENT='Table for tasks';

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
