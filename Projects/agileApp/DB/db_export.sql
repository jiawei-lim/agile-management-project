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
  `member_id` int(11) DEFAULT NULL,
  `activity_desc` varchar(50) DEFAULT NULL,
  `activity_dur` time DEFAULT NULL,
  `activity_datetime` datetime DEFAULT NULL,
  `task_id` int(5) unsigned zerofill NOT NULL,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `UNIQ_TASK_TIME` (`activity_datetime`,`task_id`) USING BTREE,
  KEY `FK_activity_member` (`member_id`),
  KEY `FK_activity_tasks` (`task_id`),
  CONSTRAINT `FK_activity_member` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_activity_tasks` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 2101db.activity: ~1 rows (approximately)

-- Dumping structure for table 2101db.members
CREATE TABLE IF NOT EXISTS `members` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_name` varchar(50) DEFAULT NULL,
  `member_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 2101db.members: ~5 rows (approximately)

-- Dumping structure for view 2101db.member_view
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `member_view` (
	`member_id` INT(11) NOT NULL,
	`member_name` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
	`member_email` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
	`total_time` TIME NULL,
	`days_worked` BIGINT(21) NOT NULL,
	`avg_time` TIME NULL
) ENGINE=MyISAM;

-- Dumping structure for table 2101db.sprints
CREATE TABLE IF NOT EXISTS `sprints` (
  `sprint_id` int(11) NOT NULL AUTO_INCREMENT,
  `sprint_name` varchar(50) NOT NULL DEFAULT '',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `sprint_status` varchar(50) DEFAULT 'Inactive',
  PRIMARY KEY (`sprint_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 2101db.sprints: ~2 rows (approximately)
INSERT INTO `sprints` (`sprint_id`, `sprint_name`, `start_date`, `end_date`, `sprint_status`) VALUES
	(20, 'Sprint 1', '2022-10-14', '2022-10-21', 'Inactive');

-- Dumping structure for table 2101db.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `priority` varchar(50) NOT NULL DEFAULT '',
  `tag` varchar(50) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `story_point` int(11) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `sprint_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `SPRINT_FK` (`sprint_id`),
  KEY `MEMBER_FK` (`member_id`),
  CONSTRAINT `MEMBER_FK` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `SPRINT_FK` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`sprint_id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `priority_cons` CHECK (`priority` = 'High' or `priority` = 'Medium' or `priority` = 'Low'),
  CONSTRAINT `status_cons` CHECK (`status` in ('To Do','In Progress','To Review','Completed'))
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COMMENT='Table for tasks';

-- Dumping data for table 2101db.tasks: ~3 rows (approximately)
INSERT INTO `tasks` (`task_id`, `name`, `description`, `status`, `priority`, `tag`, `member_id`, `story_point`, `due_date`, `sprint_id`) VALUES
	(00075, 'Create Skeleton Code', 'Create base code for upcoming project', 'To Do', 'High', 'Task', NULL, 10, '2022-10-18', 20);

-- Dumping structure for view 2101db.task_view
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `task_view` (
	`task_id` INT(5) UNSIGNED ZEROFILL NOT NULL,
	`name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`description` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
	`priority` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`tag` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
	`member_id` INT(11) NULL,
	`story_point` INT(11) NULL,
	`due_date` DATE NULL,
	`sprint_id` INT(11) NULL,
	`total_time` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Dumping structure for view 2101db.member_view
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `member_view`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `member_view` AS SELECT
	m.member_id, 
	member_name,
	member_email,
	NVL(SEC_TO_TIME(SUM( TIME_TO_SEC( `activity_dur` ))),TIME('00:00:00')) AS total_time,
	t.days_worked,
	SEC_TO_TIME(NVL(NVL(SUM( TIME_TO_SEC( `activity_dur` )),0) DIV days_worked,0)) AS avg_time
FROM
	members m LEFT JOIN activity a ON m.member_id = a.member_id 
	INNER JOIN (
		SELECT 
			m.member_id,
			COUNT(DISTINCT CONVERT(activity_datetime, DATE)) AS  days_worked
		FROM 
			activity a RIGHT JOIN members m ON a.member_id=m.member_id
		GROUP BY
			member_id
	) t ON m.member_id = t.member_id
GROUP BY 
	member_id ;

-- Dumping structure for view 2101db.task_view
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `task_view`;
CREATE ALGORITHM=TEMPTABLE SQL SECURITY DEFINER VIEW `task_view` AS SELECT 
	t.task_id,
	`name`,
	`description`,
	priority,
	tag,
	t.member_id,
	story_point,
	due_date,
	sprint_id,
	NVL(SEC_TO_TIME( SUM( TIME_TO_SEC( `activity_dur` ) ) ),'00:00:00') AS `total_time`
FROM
	tasks t LEFT JOIN activity a ON t.task_id = a.task_id
GROUP BY 
	task_id ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
