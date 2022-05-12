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
$_email = $_SESSION["customerEmail"];


$mysql_qry= "SELECT booking_appointment.id, booking_appointment.date, booking_appointment.time, booking_appointment.description, buss_customer.Name
            FROM booking_appointment
            INNER JOIN buss_customer ON booking_appointment.BusinessEmail=buss_customer.BusinessEmail
            WHERE booking_appointment.Email = '$_email'";
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

