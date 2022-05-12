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
if(isset($_GET['show_email']) && $_GET['show_email'] == 'email')
{	
    emailVerification ($_GET['email']);
}
else if(isset($_POST['email'], $_POST['firstName'], $_POST['lastName'], $_POST['password']))
{
    customerReg ($_POST['email'], $_POST['firstName'], $_POST['lastName'], $_POST['password']);
}
else if(isset($_POST['email'], $_POST['name'], $_POST['phoneNumber'], $_POST['password']))
{
    bussCustomerReg ($_POST['email'], $_POST['name'], $_POST['phoneNumber'], $_POST['password']);
}
else if(isset($_POST['email'], $_POST['new_password']))
{
	customerUpdatePassword ($_POST['email'], $_POST['new_password']);
}
else if(isset($_POST['business_email'], $_POST['business_new_password']))
{
	businessCustomerUpdatePassword ($_POST['business_email'], $_POST['business_new_password']);
}
else if (isset($_GET['get_email']) && $_GET['get_email'] == 'email')
{	
    login ($_GET['email'], $_GET['password']);
}
else
{
    echo json_encode($json);
}




// -------------------------------------------------------------------------------------------------  \\
// Email Verification
// -------------------------------------------------------------------------------------------------  \\
function emailVerification ($email){
	$mysql_qry= "SELECT Email FROM customer WHERE Email='$email'";
	$mysql_qry1= "SELECT BusinessEmail FROM buss_customer WHERE BusinessEmail='$email'";
	
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
		else
		{
			if ($result1= mysqli_query($GLOBALS['cont'], $mysql_qry1)) 
			{
				$num_of_rows1 = $result1->num_rows;
				$tem_arr1= array();
				
				if ($num_of_rows1>0)
				{
					while ($row1= mysqli_fetch_assoc($result1))
					{
						$tem_arr1[]= $row1;
					}
					$json['data']=$tem_arr1;
					echo json_encode($json);
				}
			} 
			else
			{
				$json['response'] = "Error: " . $mysql_qry1 . "<br>" . mysqli_error($GLOBALS['cont']);
				echo json_encode($json);
			}
		}
    } 
	else
	{
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}




// -------------------------------------------------------------------------------------------------  \\
// Customer Registration
// -------------------------------------------------------------------------------------------------  \\
function customerReg ($email, $firstName, $lastName, $password){
		$mysql_qry= "INSERT INTO customer (Email, FirstName, LastName, Pass_word) VALUES ('$email','$firstName', '$lastName', '$password')";
			
		if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
		{
			$json['response'] = "New customer record created successfully";
			echo json_encode($json);
		} 
		else 
		{
			$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
			echo json_encode($json);
		}
}




// -------------------------------------------------------------------------------------------------  \\
// Business Customer Registration
// -------------------------------------------------------------------------------------------------  \\
function bussCustomerReg ($email, $name, $phoneNumber, $password){
	$mysql_qry= "INSERT INTO buss_customer (BusinessEmail, Name, BusinessPass_word, PhoneNumber, Address, City, County, PostCode, Country) 
					VALUES ('$email', '$name', '$password',$phoneNumber, '', '', '', '', '');";
		
	if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
	{
		$json['response'] = "New business record created successfully";
		echo json_encode($json);
	} 
	else 
	{
		$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
		echo json_encode($json);
	}
}




// -------------------------------------------------------------------------------------------------  \\
// Customer Update Password
// -------------------------------------------------------------------------------------------------  \\
function customerUpdatePassword ($email, $new_password){
		$mysql_qry= "UPDATE customer SET Pass_word = '$new_password' WHERE Email = '$email'";
			
		if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
		{
			$json['response'] = "Customer's password updated successfully";
			echo json_encode($json);
		} 
		else 
		{
			$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
			echo json_encode($json);
		}
}





// -------------------------------------------------------------------------------------------------  \\
// Business Customer Update Password
// -------------------------------------------------------------------------------------------------  \\
function businessCustomerUpdatePassword ($email, $new_password){
		$mysql_qry= "UPDATE buss_customer SET BusinessPass_word = '$new_password' WHERE BusinessEmail = '$email'";
			
		if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
		{
			$json['response'] = "Business customer's password updated successfully";
			echo json_encode($json);
		} 
		else 
		{
			$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
			echo json_encode($json);
		}
}






// -------------------------------------------------------------------------------------------------  \\
// User Login
// -------------------------------------------------------------------------------------------------  \\
function login ($email, $password){
	$mysql_qry= "SELECT * FROM customer WHERE Email='$email' AND Pass_word='$password'";
	$mysql_qry1= "SELECT * FROM buss_customer WHERE BusinessEmail='$email' AND BusinessPass_word='$password'";
	
    if ($result= mysqli_query($GLOBALS['cont'], $mysql_qry))
	{
        $num_of_rows = $result->num_rows;
		$tem_arr= array();
		
		$firstName; $lastName;
		
        if ($num_of_rows>0)
		{
            while ($row= mysqli_fetch_assoc($result))
			{
				$tem_arr[]= $row;
				$firstName = $row['FirstName'];
				$lastName = $row['LastName'];
            }
            $json['data']=$tem_arr;
			echo json_encode($json);

			$_SESSION["customerEmail"] = $email;
			$_SESSION["customerFirstName"] = $firstName;
			$_SESSION["customerLastName"] = $lastName;
			
		}
		else
		{
			if ($result1= mysqli_query($GLOBALS['cont'], $mysql_qry1)) 
			{
				$num_of_rows1 = $result1->num_rows;
				$tem_arr1= array();
				$businessName;

				if ($num_of_rows1>0)
				{
					while ($row1= mysqli_fetch_assoc($result1))
					{
						$tem_arr1[]= $row1;
						$businessName = $row1['Name'];
						$businessPhoneNumber = $row1['PhoneNumber'];
						$businessAddress = $row1['Address'];
						$businessCity = $row1['City'];
						$businessCounty = $row1['County'];
						$businessPostCode = $row1['PostCode'];
					}
					$json['data']=$tem_arr1;
					echo json_encode($json);

					$_SESSION["businessEmail"] = $email;
					$_SESSION["businessName"] = $businessName;
					$_SESSION["businessPhoneNumber"] = $businessPhoneNumber;
					$_SESSION["businessAddress"] = $businessAddress;
					$_SESSION["businessCity"] = $businessCity;
					$_SESSION["businessCounty"] = $businessCounty;
					$_SESSION["businessPostCode"] = $businessPostCode;
				}
			} 
			else
			{
				$json['response'] = "Error: " . $mysql_qry1 . "<br>" . mysqli_error($GLOBALS['cont']);
				echo json_encode($json);
			}
		}
    } 
	else
	{
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}




?>


