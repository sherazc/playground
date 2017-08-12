-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: sa
-- ------------------------------------------------------
-- Server version	5.6.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `attend_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id_idx` (`student_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration`
--

DROP TABLE IF EXISTS `configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_name` varchar(255) NOT NULL,
  `config_value` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `config_name_UNIQUE` (`config_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration`
--

LOCK TABLES `configuration` WRITE;
/*!40000 ALTER TABLE `configuration` DISABLE KEYS */;
INSERT INTO `configuration` VALUES (1,'secret_pin','s');
/*!40000 ALTER TABLE `configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `long_name` varchar(150) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,'One','First','First Description'),(2,'Two','Second','Second Description'),(3,'Three','Third','Third Description');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `open_dates`
--

DROP TABLE IF EXISTS `open_dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `open_dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_dates`
--

LOCK TABLES `open_dates` WRITE;
/*!40000 ALTER TABLE `open_dates` DISABLE KEYS */;
INSERT INTO `open_dates` VALUES (1,'2015-08-02'),(2,'2015-08-09'),(3,'2015-08-16'),(4,'2015-08-23'),(5,'2015-08-30'),(6,'2015-09-06'),(7,'2015-09-13'),(8,'2015-09-20'),(9,'2015-09-27'),(10,'2015-10-04'),(11,'2015-10-11'),(12,'2015-10-18'),(13,'2015-10-25'),(14,'2015-11-01'),(15,'2015-11-08'),(16,'2015-11-15'),(17,'2015-11-22'),(18,'2015-11-29'),(19,'2015-12-06'),(20,'2015-12-13'),(21,'2015-12-20'),(22,'2015-12-27'),(23,'2016-01-03'),(24,'2016-01-10'),(25,'2016-01-17'),(26,'2016-01-24'),(27,'2016-01-31'),(28,'2016-02-07'),(29,'2016-02-14'),(30,'2016-02-21'),(31,'2016-02-28'),(32,'2016-03-06'),(33,'2016-03-13'),(34,'2016-03-20'),(35,'2016-03-27'),(36,'2016-04-03'),(37,'2016-04-10'),(38,'2016-04-17'),(39,'2016-04-24'),(40,'2016-05-01'),(41,'2016-05-08'),(42,'2016-05-15'),(43,'2016-05-22'),(44,'2016-05-29'),(45,'2016-06-05'),(46,'2016-06-12'),(47,'2016-06-19'),(48,'2016-06-26'),(49,'2016-07-03'),(50,'2016-07-10'),(51,'2016-07-17'),(52,'2016-07-24'),(53,'2016-07-31'),(54,'2016-08-07'),(55,'2016-08-14'),(56,'2016-08-21'),(57,'2016-08-28'),(58,'2016-09-04'),(59,'2016-09-11'),(60,'2016-09-18'),(61,'2016-09-25'),(62,'2016-10-02'),(63,'2016-10-09'),(64,'2016-10-16'),(65,'2016-10-23'),(66,'2016-10-30'),(67,'2016-11-06'),(68,'2016-11-13'),(69,'2016-11-20'),(70,'2016-11-27'),(71,'2016-12-04'),(72,'2016-12-11'),(73,'2016-12-18'),(74,'2016-12-25');
/*!40000 ALTER TABLE `open_dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `enabled` int(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (30,'OneFirst','OneLast','1',NULL,1),(31,'TwoFirst','TwoLast','2',NULL,1),(32,'ThirdFirst','ThirdLast','2',NULL,1),(33,'etrwetr','wertwert','Three',NULL,1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-18 16:09:51
