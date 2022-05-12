<?php

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



$mysql_qry= "SELECT offer_and_deal.DealTitle, offer_and_deal.DealDescription, offer_and_deal.BusinessEmail, buss_customer.Name
             FROM offer_and_deal
             INNER JOIN buss_customer ON offer_and_deal.BusinessEmail=buss_customer.BusinessEmail";          
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

