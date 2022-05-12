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


// Validation
if(isset($_POST['customerSignOut'], $_SESSION["customerEmail"], $_SESSION["customerFirstName"], $_SESSION["customerLastName"]))
{
    // remove all session variables
    session_unset();

    // destroy the session 
    session_destroy();

    $json['response'] = "deactivated_c";
    echo json_encode($json);
}
else if(isset($_POST['bussCustomerSignOut'], $_SESSION["businessEmail"], $_SESSION["businessName"]))
{
    // remove all session variables
    session_unset();

    // destroy the session 
    session_destroy();

    $json['response'] = "deactivated_bc";
    echo json_encode($json);
}
else
{
    echo json_encode($json);
}




?>

