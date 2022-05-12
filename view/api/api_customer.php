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

// Initialises customer email and full name
$email = $_SESSION["customerEmail"];
$fullName = $_SESSION["customerFirstName"] . " " . $_SESSION["customerLastName"];

// Adds email and full name to array
$myArray= array();
$myArray['email'] = $email;
$myArray['fullName'] = $fullName;

// Echos email and full name
$json['data'] = $myArray;
echo json_encode($json);



?>

