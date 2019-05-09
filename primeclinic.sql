-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: primesp1
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

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
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allergies` (
  `allergieid` int(11) NOT NULL AUTO_INCREMENT,
  `allergiename` varchar(255) NOT NULL,
  PRIMARY KEY (`allergieid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES (1,'allergie1');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL AUTO_INCREMENT,
  `notetext` longtext NOT NULL,
  `notedate` varchar(255) NOT NULL,
  `patientid` int(11) DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  KEY `patientid` (`patientid`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`patientid`) REFERENCES `patient` (`patientid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,'This is first note','12-Oct-2019',3),(2,'Hello This is first note','Fri Apr 26 2019 23:44:21 GMT+0500 (Pakistan Standard Time)',1),(3,'This is second note','Fri Apr 26 2019 23:49:16 GMT+0500 (Pakistan Standard Time)',1),(4,'This is third note','Fri Apr 26 2019 23:58:08 GMT+0500 (Pakistan Standard Time)',1),(5,'This is date note','27-4-2019',1),(6,'This is date final note','27-4-2019',1),(7,'','27-4-2019',12),(8,'This is final test','27-4-2019',12),(9,'Hello he is completely fine','27-4-2019',47),(10,'He doesnt need any medicine','27-4-2019',47),(11,'this is not fine','27-4-2019',47),(12,'this is not fine elkjelkjefkj\nelkfjeflkjef','27-4-2019',47),(13,'this is first note','27-4-2019',48),(14,'this is first note and','27-4-2019',48),(15,'Test note','29-4-2019',55),(16,'Test note\n\nTest note 2','29-4-2019',55),(17,'Test note\n\nTest note 2\n\nTest 3','29-4-2019',55),(18,'This is a testing note. Notes are added by doctor only. Should have a feature to allow adding notes on different days and times.','30-4-2019',57),(19,'Testing note number two. Should appear side by side with ptevious notes.','30-4-2019',57);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `patientid` int(11) NOT NULL AUTO_INCREMENT,
  `patientname` varchar(255) NOT NULL,
  `fathername` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `telephone1` varchar(255) DEFAULT NULL,
  `telephone2` varchar(255) DEFAULT NULL,
  `mr_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`patientid`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'MuhammadObaid','Muhammad Usman','24','Male','+923453327462','+923032758020','894742'),(2,'Syed Atif Ali','Syed Haider Ali','24','Male','+923453327461','','894743'),(3,'Khurram Irfan Adhami','Irfan Adhami','24','Male','+923453327999','','894744'),(4,'Syed Atif Ali','Syed Haider Ali','24','Male','+923453327461','','894743'),(5,'undefined','undefined','undefined','undefined','undefined','undefined','undefined'),(6,'undefined','undefined','undefined','undefined','undefined','undefined','undefined'),(7,'undefined','undefined','undefined','undefined','undefined','undefined','undefined'),(8,'undefined','undefined','undefined','undefined','undefined','undefined','undefined'),(9,'undefined','undefined','undefined','undefined','undefined','undefined','undefined'),(10,'aahhahahs,patientfathername=asas,age=12,gender=Male,telephone1=s122,telephone2=sasa,mrnumber=undefined','undefined','undefined','undefined','undefined','undefined','undefined'),(11,'sasasaqq','qqwqw1','122','Male','sasa','1w1','undefined'),(12,'obi','Muhammad Usman','12','Male','12','12','19-4-5664'),(13,'','undefined','','','','',''),(14,'','undefined','','','','',''),(15,'','undefined','','','','',''),(16,'','undefined','','','','',''),(17,'','undefined','','','','',''),(18,'','undefined','','','','',''),(19,'','undefined','','','','',''),(20,'','undefined','','','','',''),(21,'','undefined','','','','',''),(22,'','undefined','','','','',''),(23,'','undefined','','','','',''),(24,'','undefined','','','','',''),(25,'','undefined','','','','',''),(26,'','undefined','','','','',''),(27,'','undefined','','','','',''),(28,'','undefined','','','','',''),(29,'','undefined','','','','',''),(30,'dlwk','klj','lkj','Male','lkj','lkj',''),(31,'dw','cw','dw','Male','wd','dw',''),(32,'','undefined','','','','',''),(33,'','undefined','','','','',''),(34,'','undefined','','','','',''),(35,'','undefined','','','','',''),(36,'','undefined','','','','',''),(37,'','undefined','','','','',''),(38,'ABC','XYZ','23','Female','12345','12345','19-4-6787'),(39,'Aziz','Bhatti','47','Male','0900 78601','','19-4-4177'),(40,'','undefined','','','','','19-4-0918'),(41,'Muhammad Obaid','Muhammad Usman','23','Male','123','123','19-4-3672'),(42,'Muhammad Kashan','Muhammad Noman','25','Male','+923453327462','+923453327462','19-4-8739'),(43,'w;j','kj','lk','','lkj','lkj','19-4-1114'),(44,'Obaid','Atif','12','Male','309790','0978','19-4-1498'),(45,'Atif','Ali','23','Male','321','300','19-4-3772'),(46,'Donald','Trump','77','Male','090078601','0900786012','19-4-0422'),(47,'Anus','Ahmed','23','Male','12345','123456','19-4-1025'),(48,'Ahmed','Ali','24','Male','12345678','2345321','19-4-4194'),(49,'Ahmed','Ali','24','Male','12345678','2345321','19-4-4194'),(50,'Ahmed','Ali','12','male','12345678','12345','19-4-4195'),(51,'Omair','Ahmed','28','Male','92341276524','','19-4-7316'),(52,'Arif','Alvi','67','Male','090078601','0900786012','19-4-9944'),(53,'Saad','Saeed','26','Male','+923422157308','+923323067109','19-4-6042'),(54,'','','','','','','19-4-9335'),(55,'Ahmed','Ahmed','24','Male','1231231','1231232','19-4-0049'),(56,'Arif','Alvi','70','Male','090078601','090078602','19-4-2573'),(57,'Arif','Alvi','67','Male','03003548513','03003548513','19-4-0054');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_vitals`
--

DROP TABLE IF EXISTS `patient_vitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_vitals` (
  `vitals_id` int(11) NOT NULL AUTO_INCREMENT,
  `height` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `bloodpressure` varchar(255) NOT NULL,
  `pulse` varchar(255) NOT NULL,
  `temperature` varchar(255) NOT NULL,
  `po2` varchar(255) NOT NULL,
  `datetimes` varchar(255) DEFAULT NULL,
  `allergieid` int(11) DEFAULT NULL,
  `patientid` int(11) DEFAULT NULL,
  PRIMARY KEY (`vitals_id`),
  KEY `allergieid` (`allergieid`),
  KEY `patientid` (`patientid`),
  CONSTRAINT `patient_vitals_ibfk_1` FOREIGN KEY (`allergieid`) REFERENCES `allergies` (`allergieid`),
  CONSTRAINT `patient_vitals_ibfk_2` FOREIGN KEY (`patientid`) REFERENCES `patient` (`patientid`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_vitals`
--

LOCK TABLES `patient_vitals` WRITE;
/*!40000 ALTER TABLE `patient_vitals` DISABLE KEYS */;
INSERT INTO `patient_vitals` VALUES (1,'150','85','190','190','98','12','12-Jan-2019',1,1),(2,'150','85','190','190','98','12','12-Jan-2019',1,5),(3,'undefined','85','190','190','undefined','12','12=jan-2019',1,5),(4,'undefined','85','190','190','undefined','12','12=jan-2019',1,5),(5,'undefined','85','190','190','undefined','12','12=jan-2019',1,5),(6,'undefined','85','190','190','undefined','12','12-jan-2019',1,5),(7,'120','undefined','12','12','undefined','11','12-jan-2019',1,5),(8,'12','23','34','23','120','23','12-jan-2019',1,5),(9,'12','12','12','12','12','12','12-jan-2019',1,5),(10,'','undefined','','','','','undefined',1,5),(11,'','undefined','','','','','undefined',1,5),(12,'w.k','lkj','lkj','lkjlkj','klj','lkj','undefined',1,5),(13,'','undefined','','','','','undefined',1,5),(14,'','undefined','','','','','undefined',1,5),(15,'','undefined','','','','','undefined',1,5),(16,'','undefined','','','','','undefined',1,5),(17,'','undefined','','','','','123',1,5),(18,'','undefined','','','','','2017-06-24T10:30',1,5),(19,'120mm','85kg','120/80','145','undefined','12','2020-12-12',1,12),(23,'150','85','190','190','98','12','12-Jan-2019',1,1),(24,'190','90','120/90','120','98','1','2020-02-02',1,12),(28,'200','200','200/200','200','98','2','2021-12-20',1,12),(29,'12','23','21','12','23','23','2021-04-02',1,12),(30,'190','12','123','12','98','12','27-4-2019',1,1),(31,'120','123','21','12','12','12','27-4-2019',1,12),(32,'194','90','120/80','140','98','90','27-4-2019',1,47),(33,'90','89','190/80','12','98','12','27-4-2019',1,48),(34,'180','67','100/80','90','32','60','29-4-2019',1,55),(39,'166.67','72','120','79','99','123','30-4-2019',1,57);
/*!40000 ALTER TABLE `patient_vitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertable` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (7,'Admin','admin','Admin'),(8,'Receptionist','receptionist','Receptionist'),(9,'Nurse','nurse','Nurse'),(10,'Doctor','doctor','Doctor'),(13,'Admin2','admin2','Admin');
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-02 10:21:42
