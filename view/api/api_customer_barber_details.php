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


// -------------------------------------------------------------------------------------------------  \\
// Validation
// -------------------------------------------------------------------------------------------------  \\
if(isset($_POST['postFromTodayDeals'], $_POST['businessEmail']))
{
    $_SESSION["postBusinessEmail"] = $_POST['businessEmail'];
}
else if(isset($_POST['postFromBarber'], $_POST['businessEmail3']))
{
    $_SESSION["postBusinessEmail"] = $_POST['businessEmail3'];
}


$businessEmail = $_SESSION["postBusinessEmail"];


$mysql_qry= "SELECT * FROM buss_customer
            INNER JOIN buss_customer_extra ON buss_customer.BusinessEmail=buss_customer_extra.BusinessEmail
            WHERE buss_customer.BusinessEmail = '$businessEmail'";

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

