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



// -------------------------------------------------------------------------------------------------  \\
// Validation
// -------------------------------------------------------------------------------------------------  \\
if(isset($_POST['name'], $_POST['email'], $_POST['message']))
{
    help($_POST['name'], $_POST['email'], $_POST['message']);
}
else if(isset($_POST['bussName'], $_POST['bussPhoneNum'], $_POST['bussEmail']))
{
    bussProfileUpdate($_POST['bussName'], $_POST['bussPhoneNum'], $_POST['bussEmail']);
}
else if(isset($_POST['newPassword'], $_POST['bussEmail']))
{
    bussPasswordUpdate($_POST['newPassword'], $_POST['bussEmail']);
}
else if(isset($_POST['bussAddress'], $_POST['bussCity'], $_POST['bussCounty'],
         $_POST['bussCountry'], $_POST['bussPostCode'], $_POST['bussEmail']))
{
    bussAddressUpdate($_POST['bussAddress'], $_POST['bussCity'], $_POST['bussCounty'],
        $_POST['bussCountry'], $_POST['bussPostCode'], $_POST['bussEmail']);
}
else if(isset($_POST['bussLatitude'], $_POST['bussLongitude'], $_POST['bussTimes'],
         $_POST['bussDays'], $_POST['bussEmail']))
{
    bussInformationUpdate ($_POST['bussLatitude'], $_POST['bussLongitude'], $_POST['bussDays'],
        $_POST['bussTimes'], $_POST['bussEmail']);
}
else if(isset($_POST['offerIdNumber']))
{
    deleteOffer($_POST['offerIdNumber']);
}
else if(isset($_POST['offerTitle'], $_POST['offerDescription']))
{
    addOffer($_POST['offerTitle'], $_POST['offerDescription'], $email);
}
else if(isset($_POST['appointmentIdNumber']))
{
    deleteAppointment($_POST['appointmentIdNumber']);
}
else if(isset($_POST['partName'], $_POST['partPrice'], $_POST['partDescription']))
{
    addPart($_POST['partName'], $_POST['partPrice'], $_POST['partDescription'], $email);
}
else if(isset($_POST['partIdNumber']))
{
    deletePart($_POST['partIdNumber']);
}
else if(isset($_POST['toolName'], $_POST['toolPrice'], $_POST['toolDescription']))
{
    addTool($_POST['toolName'], $_POST['toolPrice'], $_POST['toolDescription'], $email);
}
else if(isset($_POST['toolIdNumber']))
{
    deleteTool($_POST['toolIdNumber']);
}
else 
{
    echo json_encode($json);
}





// -------------------------------------------------------------------------------------------------  \\
// Help
// -------------------------------------------------------------------------------------------------  \\
function help ($name, $email, $message){
    $mysql_qry= "INSERT INTO help (id, name, email, message) VALUES (NULL, '$name', '$email', '$message');";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Message created successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}





// -------------------------------------------------------------------------------------------------  \\
// Business Profile Update
// -------------------------------------------------------------------------------------------------  \\
function bussProfileUpdate ($bussName, $bussPhoneNum, $bussEmail){
    $mysql_qry= "UPDATE buss_customer SET Name='$bussName', PhoneNumber='$bussPhoneNum' WHERE BusinessEmail='$bussEmail'";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Business profile details updated successfully";
        echo json_encode($json);

        $_SESSION["businessName"] = $bussName;
        $_SESSION["businessPhoneNumber"] = $bussPhoneNum;
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}







// -------------------------------------------------------------------------------------------------  \\
// Business Password Update
// -------------------------------------------------------------------------------------------------  \\
function bussPasswordUpdate ($newPassword, $bussEmail){
    $mysql_qry= "UPDATE buss_customer SET BusinessPass_word = '$newPassword' WHERE BusinessEmail = '$bussEmail'";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Business password updated successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}






// -------------------------------------------------------------------------------------------------  \\
// Business Address Update
// -------------------------------------------------------------------------------------------------  \\
function bussAddressUpdate ($bussAddress, $bussCity, $bussCounty, $bussCountry, $bussPostCode, $bussEmail){
    $mysql_qry= "UPDATE buss_customer SET Address = '$bussAddress', City = '$bussCity', County = '$bussCounty',
    PostCode = '$bussPostCode', Country = '$bussCountry'  
    WHERE BusinessEmail = '$bussEmail'";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Business address updated successfully";
        echo json_encode($json);

        $_SESSION["businessAddress"] = $bussAddress;
        $_SESSION["businessCity"] = $bussCity;
        $_SESSION["businessCounty"] = $bussCounty;
        $_SESSION["businessPostCode"] = $bussPostCode;
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}







// -------------------------------------------------------------------------------------------------  \\
// Business Information Update
// -------------------------------------------------------------------------------------------------  \\
function bussInformationUpdate ($bussLatitude, $bussLongitude, $bussDays, $bussTimes, $bussEmail){
    $mysql_qry= "DELETE FROM buss_customer_extra WHERE buss_customer_extra.BusinessEmail = '$bussEmail'";
    $mysql_qry1= "INSERT INTO buss_customer_extra (id, opening_times, opening_days, latitude, longitude, BusinessEmail) 
                    VALUES (NULL, '$bussTimes', '$bussDays', '$bussLatitude', '$bussLongitude', '$bussEmail')";


    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        if (mysqli_query($GLOBALS['cont'], $mysql_qry1)) 
        {
            $json['response'] = "Business information updated successfully";
            echo json_encode($json);
        } 
        else 
        {
            $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
            echo json_encode($json);
        } 
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
    

}








// -------------------------------------------------------------------------------------------------  \\
// Delete Offer
// -------------------------------------------------------------------------------------------------  \\
function deleteOffer ($id){
    $mysql_qry= "DELETE FROM offer_and_deal WHERE id = '$id'";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Offer deleted successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}








// -------------------------------------------------------------------------------------------------  \\
// Add Offer
// -------------------------------------------------------------------------------------------------  \\
function addOffer ($offerTitle, $offerDescription, $email){
    $mysql_qry= "INSERT INTO offer_and_deal (id, DealTitle, DealDescription, BusinessEmail) 
                    VALUES (NULL, '$offerTitle', '$offerDescription', '$email')";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Offer added successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
    

}






// -------------------------------------------------------------------------------------------------  \\
// Delete Appointment
// -------------------------------------------------------------------------------------------------  \\
function deleteAppointment ($id){
    $mysql_qry= "DELETE FROM booking_appointment WHERE id = '$id'";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Appointment deleted successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}






// -------------------------------------------------------------------------------------------------  \\
// Add Part
// -------------------------------------------------------------------------------------------------  \\
function addPart ($partName, $partPrice, $partDescription, $email){
    $mysql_qry= "INSERT INTO car_part (id, name, description, price, BusinessEmail) 
                VALUES (NULL, '$partName', '$partDescription', '$partPrice', '$email')";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Part added successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
    

}






// -------------------------------------------------------------------------------------------------  \\
// Delete Part
// -------------------------------------------------------------------------------------------------  \\
function deletePart ($id){
    $mysql_qry= "DELETE FROM car_part WHERE id = '$id'";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Part deleted successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}







// -------------------------------------------------------------------------------------------------  \\
// Add Tool
// -------------------------------------------------------------------------------------------------  \\
function addTool ($toolName, $toolPrice, $toolDescription, $email){
    $mysql_qry= "INSERT INTO hire_tool (id, name, description, price, BusinessEmail) 
                VALUES (NULL, '$toolName', '$toolDescription', '$toolPrice', '$email')";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Tool added successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
    

}






// -------------------------------------------------------------------------------------------------  \\
// Delete Tool
// -------------------------------------------------------------------------------------------------  \\
function deleteTool ($id){
    $mysql_qry= "DELETE FROM hire_tool WHERE id = '$id'";

    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Tool deleted successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}





?>

