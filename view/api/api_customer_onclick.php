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


// -------------------------------------------------------------------------------------------------  \\
// Validation
// -------------------------------------------------------------------------------------------------  \\
if(isset($_POST['name'], $_POST['email'], $_POST['message']))
{
    help($_POST['name'], $_POST['email'], $_POST['message']);
}
else if(isset($_POST['firstName'], $_POST['lastName'], $_POST['email']))
{
    profileUpdate($_POST['firstName'], $_POST['lastName'], $_POST['email']);
}
else if(isset($_POST['newPassword'], $_POST['email']))
{
    passwordUpdate($_POST['newPassword'], $_POST['email']);
}
else if(isset($_POST['bussEmail'], $_POST['bookDate'], $_POST['bookTime'], $_POST['bookDescription']))
{
    bookAppointment($_POST['bussEmail'], $_POST['bookDate'], $_POST['bookTime'], $_POST['bookDescription'], $_email);
}
else if(isset($_POST['bookingIdNumber']))
{
    deleteAppointment($_POST['bookingIdNumber']);
}
else if(isset($_POST['barberSearchWord'], $_POST['barber']))
{
    searchForBarber($_POST['barber']);
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
// Profile Update
// -------------------------------------------------------------------------------------------------  \\
function profileUpdate ($firstName, $lastName, $email){
    $mysql_qry= "UPDATE customer SET FirstName='$firstName', LastName='$lastName' WHERE Email='$email'";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Account details updated successfully";
        echo json_encode($json);

        $_SESSION["customerFirstName"] = $firstName;
        $_SESSION["customerLastName"] = $lastName;
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}




// -------------------------------------------------------------------------------------------------  \\
// Password Update
// -------------------------------------------------------------------------------------------------  \\
function passwordUpdate ($newPassword, $email){
    $mysql_qry= "UPDATE customer SET Pass_word = '$newPassword' WHERE Email = '$email'";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Password updated successfully";
        echo json_encode($json);
    } 
    else 
    {
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}





// -------------------------------------------------------------------------------------------------  \\
// Booking Appointment
// -------------------------------------------------------------------------------------------------  \\
function bookAppointment ($bussEmail, $bookDate, $bookTime, $bookDescription, $email){
    $mysql_qry= "INSERT INTO booking_appointment (id, date, time, description, Email, BusinessEmail) 
    VALUES (NULL, '$bookDate', '$bookTime', '$bookDescription', '$email', '$bussEmail');";
        
    if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
    {
        $json['response'] = "Appointment has been successfully booked";
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
// Search for Barber
// -------------------------------------------------------------------------------------------------  \\
function searchForBarber($barber){
    $mysql_qry= "SELECT BusinessEmail, Name, City, PostCode FROM buss_customer WHERE City = '$barber'";
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

}






?>

