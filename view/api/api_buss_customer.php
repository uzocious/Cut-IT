<?php

// Start the session
session_start();


// -------------------------------------------------------------------------------------------------  \\
// Creating a new php file
// -------------------------------------------------------------------------------------------------  \\
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once ('config.php');
$json = array();
$json=array('response' => 'error',
                'data'=> '0'
);

// session variable initialisation
$email = $_SESSION["businessEmail"];
$businessName = $_SESSION["businessName"];
$businessPhoneNumber = $_SESSION["businessPhoneNumber"];
$businessAddress = $_SESSION["businessAddress"];
$businessCity =	$_SESSION["businessCity"];
$businessCounty	= $_SESSION["businessCounty"];
$businessPostCode =	$_SESSION["businessPostCode"];


// Add to array
$myArray= array();
$myArray['email'] = $email;
$myArray['businessName'] = $businessName;
$myArray['businessPhoneNumber'] = $businessPhoneNumber;
$myArray['businessAddress'] = $businessAddress;
$myArray['businessCity'] = $businessCity;
$myArray['businessCounty'] = $businessCounty;
$myArray['businessPostCode'] = $businessPostCode;

// Echos array
$json['data'] = $myArray;
echo json_encode($json);



?>

