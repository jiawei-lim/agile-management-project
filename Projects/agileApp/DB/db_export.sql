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
  KEY `FK_activity_tasks` (`task_id`),
  KEY `FK_activity_member` (`member_id`),
  CONSTRAINT `FK_activity_member` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_activity_tasks` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 2101db.activity: ~8 rows (approximately)
INSERT INTO `activity` (`activity_id`, `member_id`, `activity_desc`, `activity_dur`, `activity_datetime`, `task_id`) VALUES
	(37, 4, 'TEST TEST', '00:30:00', '2022-10-11 15:37:15', 00069),
	(38, 1, 'TESTING', '02:00:00', '2022-10-10 15:00:00', 00067),
	(48, 1, 'Testing 3234234', '01:01:00', '2022-10-12 01:30:00', 00067),
	(49, 1, 'Lorem Ipsum', '01:00:00', '2022-10-12 15:45:00', 00070),
	(50, 1, 'Did some next parts', '01:00:00', '2022-10-12 19:30:00', 00070),
	(52, 4, 'wdwadawdawd', '11:11:00', '2022-10-12 11:11:00', 00067),
	(54, 1, 'Did somehting', '02:00:00', '2022-09-12 18:30:00', 00066),
	(55, 2, 'awiuhdlkahlk', '00:30:00', '2022-10-12 18:31:32', 00069);

-- Dumping structure for table 2101db.members
CREATE TABLE IF NOT EXISTS `members` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_name` varchar(50) DEFAULT NULL,
  `member_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 2101db.members: ~4 rows (approximately)
INSERT INTO `members` (`member_id`, `member_name`, `member_email`) VALUES
	(1, 'Jia Wei', 'jw@gmail.com'),
	(2, 'Boren', 'br@email.com'),
	(3, 'Sam', 'sam@email.com'),
	(4, 'JK', 'JK@email.com');

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 2101db.sprints: ~3 rows (approximately)
INSERT INTO `sprints` (`sprint_id`, `sprint_name`, `start_date`, `end_date`, `sprint_status`) VALUES
	(16, 'Sprint 1 Demo', '2022-10-05', '2022-10-12', 'Inactive'),
	(17, 'Sprint 2 Demo', '2022-10-05', '2022-10-12', 'Inactive'),
	(19, 'Sprint 3', '2022-10-26', '2022-10-31', 'Inactive');

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
  PRIMARY KEY (`task_id`),
  KEY `SPRINT_FK` (`sprint_id`),
  CONSTRAINT `SPRINT_FK` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`sprint_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `priority_cons` CHECK (`priority` = 'High' or `priority` = 'Medium' or `priority` = 'Low'),
  CONSTRAINT `status_cons` CHECK (`status` in ('To Do','In Progress','To Review','Completed'))
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COMMENT='Table for tasks';

-- Dumping data for table 2101db.tasks: ~5 rows (approximately)
INSERT INTO `tasks` (`task_id`, `name`, `description`, `status`, `priority`, `tag`, `assignee`, `story_point`, `due_date`, `sprint_id`) VALUES
	(00065, 'Demo Task 2', 'Do another thing', 'In Progress', 'Medium', 'Story', 'Jia Wei', 5, '2022-10-09', 16),
	(00066, 'Demo Task 3', 'demoing task', 'To Do', 'High', 'Story', 'Boren', 1, '2022-10-05', 19),
	(00067, 'Test', 'dwd', 'To Do', 'Medium', 'Task', 'Lim Jia Wei', 10, '2022-10-05', 16),
	(00069, 'Demo Task 5', 'wjdlasjkdasd', 'Completed', 'Low', 'Bug', 'Jia Wei', 10, '2022-10-10', 16),
	(00070, 'UI enchancements', 'We have to do this', 'To Review', 'Low', 'UI/UX', 'Jia Wei', 10, '2022-10-19', 16);

-- Dumping structure for view 2101db.task_view
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `task_view` (
	`task_id` INT(5) UNSIGNED ZEROFILL NOT NULL,
	`name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`description` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
	`priority` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`tag` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
	`assignee` VARCHAR(50) NULL COLLATE 'utf8mb4_general_ci',
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
	assignee,
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
