// -------------------------------------------------------------------------------------------------  \\
// Local Variables
// -------------------------------------------------------------------------------------------------  \\
// Regular Expression Variables
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
var numberPattern = /^\d*$/;


$(document).ready(function() 
{
    // Capitalizing
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }



    
    // -------------------------------------------------------------------------------------------------  \\
    // Customer Registration
    // -------------------------------------------------------------------------------------------------  \\
    $("#customer_sign_up").click(function(e) 
    {
        e.preventDefault();

        // Declaring and initializing variables
        var email = $("#cus_email").val();
        var firstName = $("#cus_first_name").val();
        var lastName = $("#cus_last_name").val();
        var password = $("#cus_password").val();
        var confirm_password = $("#cus_confirm_password").val();
        
        // Variable validations
        email = email.trim();
        firstName = firstName.trim();
        lastName = lastName.trim();

        firstName = firstName.capitalize();
        lastName = lastName.capitalize();
        email = email.toLowerCase();

        // checks user's inputs
        if(email != "" && firstName != "" && lastName != "" && password != "" && confirm_password != "")
        {
            // checks email validity
            if (email.match(emailPattern))
            {
                // checks password compatibility
                if (password == confirm_password)
                {
                    $.ajax({
                        url: 'http://localhost/cut-it/view/api/api_authentication.php',
                        data: {show_email:'email', email:email},
                        datatype:'json',
                        type:'GET',
                        success: function (data)
                        {
                            // Validates records from the database
                            // Checks if email exists
                            if(data.data != 0)
                            {
                                $.each(data.data,function (key,index)
                                {
                                    console.log("Cus: " + index.Email);
                                    console.log("Buss: " + index.BusinessEmail);
        
                                    if(index.Email != undefined)
                                    {
                                        alert("Someone has already registered using this email.");
                                    }
                                    else if (index.BusinessEmail != undefined)
                                    {
                                        alert("A business has already registered using this email.");
                                    }
            
                                });
                            }
                        },
                        error: function () 
                        {
                            // Inserts customer's records to the database
                            $.ajax({
                                url:'http://localhost/cut-it/view/api/api_authentication.php',
                                dataType: 'json',
                                type:'POST',
                                data: {'email':email, 'firstName':firstName, 'lastName': lastName, 'password':password},
                                success: function (data)
                                {
                                    console.log(data.response);
                                    alert("Registration Successful!");
                                    window.location.href="./log_in.html";
                                },
                                error: function (xhr,status,error) {
                                    console.log(xhr.statusText + " " + status + " " + error);
                                }
                                })
                        }
                    })
                }
                else{ alert("Password does not match.");}
            }
            else{ alert("Email is not in the correct format.");} 
        }
        else{ alert("Please complete the form.");}
    });






    // -------------------------------------------------------------------------------------------------  \\
    // Business Customer Registration
    // -------------------------------------------------------------------------------------------------  \\
    $("#business_customer_sign_up").click(function(e) 
    {
        e.preventDefault();
        var email = $("#buss_email").val();
        var name = $("#buss_name").val();
        var phoneNumber = $("#buss_phone_no").val();
        var password = $("#buss_password").val();
        var confirm_password = $("#buss_confirm_password").val();

        // Variable validations
        email = email.trim();
        name = name.trim();
        phoneNumber = phoneNumber.trim();

        name = name.capitalize();
        email = email.toLowerCase();

        // checks user's inputs
        if(email != "" && name != "" && phoneNumber != "" && password != "" && confirm_password != "")
        {
            // checks email validity
            if (email.match(emailPattern))
            {
                // checks phone number validity
                if (numberPattern.test(phoneNumber))
                {
                    // checks password compatibility
                    if (password == confirm_password)
                    {
                        $.ajax({
                            url: 'http://localhost/cut-it/view/api/api_authentication.php',
                            data: {show_email:'email', email:email},
                            datatype:'json',
                            type:'GET',
                            success: function (data)
                            {
                                // Validates records from the database
                                // Checks if email exists
                                if(data.data != 0)
                                {
                                    $.each(data.data,function (key,index)
                                    {
                                        console.log("Cus: " + index.Email);
                                        console.log("Buss: " + index.BusinessEmail);
            
                                        if(index.Email != undefined)
                                        {
                                            alert("Someone has already registered using this email.");
                                        }
                                        else if (index.BusinessEmail != undefined)
                                        {
                                            alert("A business has already registered using this email.");
                                        }
                
                                    });
                                }
                            },
                            error: function () 
                            {
                                // Inserts business customer's records to the database
                                $.ajax({
                                    url:'http://localhost/cut-it/view/api/api_authentication.php',
                                    dataType: 'json',
                                    type:'POST',
                                    data: {'email':email, 'name':name, 'phoneNumber': phoneNumber, 'password':password},
                                    success: function (data){
                                        console.log(data.response);
                                        alert("Registration Successful!");
                                        window.location.href="./log_in.html";
                                    },
                                    error: function (xhr,status,error) {
                                        console.log(xhr.statusText + " " + status + " " + error);
                                    }
                                })
                            }
                        })
                    }
                    else{ alert("Password does not match.");}
                }
                else{ alert("Phone number is invalid.");}
            }
            else{ alert("Email is not in the correct format.");}
        }
        else{ alert("Please complete the form.");}
    });






    // -------------------------------------------------------------------------------------------------  \\
    // Forgotten password
    // -------------------------------------------------------------------------------------------------  \\
    $("#forgotten_password").click(function(e) 
	{
        e.preventDefault();
        var email = $("#forgot_pass_email").val();
        var new_password = $("#forgot_pass_new_password").val();
		var confirm_new_password = $("#forgot_pass_confirm_password").val();
        
        // Variable validations
        email = email.trim();
        email = email.toLowerCase();

        // checks user's inputs
        if(email != "" && new_password != "" && confirm_new_password != "")
        {
            // checks email validity
            if (email.match(emailPattern))
            {
                // checks password compatibility
                if (new_password == confirm_new_password)
                {
                    $.ajax({
                        url: 'http://localhost/cut-it/view/api/api_authentication.php',
                        data: {show_email:'email', email:email},
                        datatype:'json',
                        type:'GET',
                        success: function (data)
                        {
                            // Validates records from the database
                            if(data.data != 0)
                            {
                                $.each(data.data,function (key,index)
                                {
                                    console.log("Customer: " + index.Email);
                                    console.log("Business: " + index.BusinessEmail);
            
                                    if(index.Email != undefined)
                                    {
                                        $.ajax({
                                            url:'http://localhost/cut-it/view/api/api_authentication.php',
                                            dataType: 'json',
                                            type:'POST',
                                            data: {'email':email, 'new_password':new_password},
                                            success: function (data){
                                                console.log(data.response);
                                                alert("Password Successfully Updated!");
                                            },
                                            complete: function (){
                                                window.location.href="./log_in.html";
                                            }
                                        })
                                    }
                                    else if (index.BusinessEmail != undefined)
                                    {
                                        $.ajax({
                                            url:'http://localhost/cut-it/view/api/api_authentication.php',
                                            dataType: 'json',
                                            type:'POST',
                                            data: {'business_email':email, 'business_new_password':new_password},
                                            success: function (data){
                                                console.log(data.response);
                                                alert("Password Successfully Updated!");
                                            },
                                            complete: function (){
                                                window.location.href="./log_in.html";
                                            }
                                        })
                                    }
                                });
                            }
                        },
                        error: function () 
                        {
                            alert("There is no registered account with this email.");
                        }
                    })
                } 
                else{ alert("Password does not match.");}
            }
            else{ alert("Email is not in the correct format.");}
        }
        else{ alert("Please complete the form.");}
    });







    // -------------------------------------------------------------------------------------------------  \\
    // User Login
    // -------------------------------------------------------------------------------------------------  \\
    $("#login").click(function(e)
    {
        e.preventDefault();
		var email = $("#login_email").val();
        var password = $("#login_password").val();
        
        // Variable validations
        email = email.trim();
        email = email.toLowerCase();

        // checks user's inputs
        if(email != "" && password != "")
        {
            // checks email validity
            if(email.match(emailPattern))
            {                
                $.ajax({
                    url: 'http://localhost/cut-it/view/api/api_authentication.php',
                    data: {get_email:'email', email:email, password:password},
                    datatype:'json',
                    type:'GET',
                    success: function(data)
                    {
                        if(data.data != 0)
                        {
                            $.each(data.data,function (key,index) 
                            {
                                console.log("Customer: " + index.Email)
                                console.log("Customer Pass: " + index.Pass_word)
                                console.log("Business: " + index.BusinessEmail)
                                console.log("Business Pass: " + index.BusinessPass_word)

                                if(index.Email != undefined && index.Pass_word != undefined)
                                {
                                    window.location.href="../v_customer/index.html";
                                }
                                else if (index.BusinessEmail != undefined && index.BusinessPass_word != undefined)
                                {
                                    window.location.href="../v_buss_customer/index.html";
                                }
                            })
                        }
                    },
                    error: function ()
                    {
                        alert("Incorrect Email or Password.");
                    }
                })
            }
            else{ alert("Email is not in the correct format.");}
        }
        else{ alert("Please complete the form.");} 
    })








});







