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
if(isset($_POST['autoSignIn'], $_SESSION["customerEmail"], $_SESSION["customerFirstName"], $_SESSION["customerLastName"]))
{
    $json['response'] = "activated_c";
    echo json_encode($json);
}
else if(isset($_POST['autoSignIn'], $_SESSION["businessEmail"], $_SESSION["businessName"]))
{
    $json['response'] = "activated_bc";
    echo json_encode($json);
}
else
{
    echo json_encode($json);
}




?>

