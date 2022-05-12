-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 12, 2022 at 05:22 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cut_it`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking_appointment`
--

DROP TABLE IF EXISTS `booking_appointment`;
CREATE TABLE IF NOT EXISTS `booking_appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `time` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `BusinessEmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Email` (`Email`),
  KEY `BusinessEmail` (`BusinessEmail`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buss_customer`
--

DROP TABLE IF EXISTS `buss_customer`;
CREATE TABLE IF NOT EXISTS `buss_customer` (
  `BusinessEmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `BusinessPass_word` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PhoneNumber` bigint(50) NOT NULL,
  `Address` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `City` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `County` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PostCode` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Country` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`BusinessEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `buss_customer`
--

INSERT INTO `buss_customer` (`BusinessEmail`, `Name`, `BusinessPass_word`, `PhoneNumber`, `Address`, `City`, `County`, `PostCode`, `Country`) VALUES
('barberinc@email.com', 'Barber Inc.', 'Pa$$w0rd', 1727621569, '185 Hatfield Road', 'st. albans', 'Hertfordshire', 'AL1 4LG', 'United Kingdom'),
('bedfordbarber@email.com', 'Bedford Barber Co.', 'Pa$$w0rd', 7429153339, '1 Hardwick Road', 'Bedford', 'Bedfordshire', 'MK42 9LF', 'United Kingdom'),
('blendzbarbershop@email.com', 'Blendz Barber Shop', 'Pa$$w0rd', 1582933810, '10 Dunstable Pi', 'Luton', 'Bedfordshire', 'LU1 2RD', 'United Kingdom'),
('braidbarbers@email.com', 'Braid Barbers', 'Pa$$w0rd', 1908604551, '769 Midsummer Blvd', 'Milton Keynes', 'Buckinghamshire', 'MK9 3BG', 'United Kingdom'),
('citybarberchester@email.com', 'City Barber Chester', 'Pa$$w0rd', 7543694233, 'Kiosk 3a,Eastgate St, Row', 'Chester', 'Cheshire', 'CH1 1LQ', 'United Kingdom'),
('classicbackandsides@email.com', 'Classic Back and Sides', 'Pa$$w0rd', 7593224113, '1 Goss St', 'Chester', 'Cheshire', 'CH1 2BG', 'United Kingdom'),
('darcysbarbe@email.com', 'Darcys Barber Shop', 'Pa$$w0rd', 1234400770, '64 St Loyes St', 'Bedford', 'Bedfordshire', 'MK40 1EZ', 'United Kingdom'),
('goodfellas@email.com', 'Goodfellas', 'Pa$$w0rd', 1727895600, '197 Hatfield Rd', 'St. Albans', 'Hertfordshire', 'AL1 4LH', 'United Kingdom'),
('lubarbersltd@email.com', 'Lu Barbers Ltd', 'Pa$$w0rd', 1582727694, '162 Dallow Road', 'Luton', 'Bedfordshire', 'LU1 1NG', 'United Kingdom'),
('mrbarberschester@email.com', 'Mr. Barbers Chester', 'Pa$$w0rd', 1244311970, '57 Bridge St, East', 'Chester', 'Cheshire', 'CH1 1NW', 'United Kingdom'),
('mytsharp@email.com', 'My-T Sharp', 'Pa$$w0rd', 1234353425, '115 Newnham Ave', 'Bedford', 'Bedfordshire', 'MK41 9QA', 'United Kingdom'),
('no1barbers@email.com', 'No.1 Barbers', 'Pa$$w0rd', 1908271857, '24 Watling St, Fenny Stratford, Bletchy', 'Milton Keynes', 'Buckinghamshire', 'MK2 2BL', 'United Kingdom'),
('roccos@email.com', 'Roccos', 'pa$$w0rd', 1582485550, '18 Old Bedford Road', 'Luton', 'Bedfordshire', 'LU2 7NZ', 'United Kingdom'),
('studiobarbers@email.com', 'Studio Barbers Mk', 'Pa$$w0rd', 1908314999, '44 High St, New Bradwell', 'Milton Keynes', 'Buckinghamshire', 'MK13 0BT', 'United Kingdom'),
('thecontinental@email.com', 'The Continental', 'Pa$$w0rd', 1707264077, '20 Market Pi', 'Hatfield', 'Hertfordshire', 'AL10 0LN', 'United Kingdom');

-- --------------------------------------------------------

--
-- Table structure for table `buss_customer_extra`
--

DROP TABLE IF EXISTS `buss_customer_extra`;
CREATE TABLE IF NOT EXISTS `buss_customer_extra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_times` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `opening_days` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `BusinessEmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BusinessEmail` (`BusinessEmail`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `buss_customer_extra`
--

INSERT INTO `buss_customer_extra` (`id`, `opening_times`, `opening_days`, `latitude`, `longitude`, `BusinessEmail`) VALUES
(25, '9am - 5pm', 'Open all weekdays. Closed weekends.', 51.762808, -0.314427, 'barberinc@email.com'),
(3, '9am - 5pm', 'Open all weekdays. Closed weekends', 52.125222, -0.465, 'bedfordbarber@email.com'),
(4, '9am - 5pm', 'Open every day of the week', 51.879385, -0.419312, 'blendzbarbershop@email.com'),
(5, '9am - 5pm', 'Open all weekdays. Closed weekends', 52.044175, -0.752248, 'braidbarbers@email.com'),
(6, '9am - 5pm', 'Open every day of the week', 53.190407, -2.891048, 'citybarberchester@email.com'),
(7, '9am - 5pm', 'Open all weekdays. Closed weekends', 53.19041, -2.892626, 'classicbackandsides@email.com'),
(8, '9am - 5pm', 'Open every day of the week', 52.138309, -0.469771, 'darcysbarbe@email.com'),
(9, '9am - 5pm', 'Open every day of the week', 51.751989, -0.312022, 'goodfellas@email.com'),
(10, '9am - 5pm', 'Open all weekdays. Closed weekends', 51.882157, -0.433567, 'lubarbersltd@email.com'),
(11, '9am - 5pm', 'Open all weekdays. Closed weekends', 53.188813, -2.891066, 'mrbarberschester@email.com'),
(15, '9am - 5pm', 'Monday - Tuesday - Wednesday - Thursday - Friday. Closed weekends.', 52.139542, -0.443481, 'mytsharp@email.com'),
(16, '8am - 5:30pm', 'Open Monday - Saturday. Closed Sunday', 51.998145, -0.714847, 'no1barbers@email.com'),
(17, '9am - 5pm', 'Open every day of the week', 51.883673, -0.417131, 'roccos@email.com'),
(23, '9am - 5pm', 'Open all weekdays. Closed weekends', 52.064759, -0.791587, 'studiobarbers@email.com'),
(24, '9am - 5pm', 'Open every day of the week', 51.762808, -0.226656, 'thecontinental@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `Email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FirstName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `LastName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Pass_word` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Email`, `FirstName`, `LastName`, `Pass_word`) VALUES
('uzocious@gtm.com', 'UU', 'UUU', 'u');

-- --------------------------------------------------------

--
-- Table structure for table `help`
--

DROP TABLE IF EXISTS `help`;
CREATE TABLE IF NOT EXISTS `help` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `offer_and_deal`
--

DROP TABLE IF EXISTS `offer_and_deal`;
CREATE TABLE IF NOT EXISTS `offer_and_deal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `DealTitle` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `DealDescription` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `BusinessEmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BusinessEmail` (`BusinessEmail`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `offer_and_deal`
--

INSERT INTO `offer_and_deal` (`id`, `DealTitle`, `DealDescription`, `BusinessEmail`) VALUES
(19, 'Free Under 6 Haircut', 'Free haircut for kids under 6 when accompanied by an adult.', 'citybarberchester@email.com'),
(20, 'Free Cut', 'Free cut after 10 visits', 'darcysbarbe@email.com'),
(21, 'Student Discount', '10% of for students, must provide valid student id.', 'mytsharp@email.com'),
(17, '20% Off', 'Share code to your friends and get 20% off.', 'barberinc@email.com'),
(18, 'Haircut and Wash', 'Get a haircut and a wash and get free facials (offer ends soon).', 'barberinc@email.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
