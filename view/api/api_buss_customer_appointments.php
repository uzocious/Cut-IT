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

// Initialises sessions
$email = $_SESSION["businessEmail"];


$mysql_qry= "SELECT * FROM booking_appointment
            INNER JOIN customer ON booking_appointment.Email=customer.Email
            WHERE booking_appointment.BusinessEmail = '$email'";

if ($result= mysqli_query($GLOBALS['cont'], $mysql_qry)) 
{
    $num_of_rows = $result->num_rows;
    $tem_arr= array();
    
    if ($num_of_rows>0)
    {
        while ($row= mysqli_fetch_assoc($result))
        {
            $tem_arr[]= $row;
        }
        $json['data']=$tem_arr;
        echo json_encode($json);
    }
} 
else
{
    $json['response'] = "Error: " . $mysql_qry1 . "<br>" . mysqli_error($GLOBALS['cont']);
    echo json_encode($json);
}




?>

