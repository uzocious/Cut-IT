// -------------------------------------------------------------------------------------------------  \\
// Functions
// -------------------------------------------------------------------------------------------------  \\
function Edit()
    {
        cus_first_name.select();
        document.getElementById("cus_first_name").readOnly = false;
        document.getElementById("cus_last_name").readOnly = false;
    }

$(document).ready(function() {

    // Capitalizing
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }




    // Displays customer's full name
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_customer.php',
        datatype:'json',
        success: function (data)
        {
            var response = data.data;
            document.getElementById('cus_full_name').innerHTML = response.fullName;

            var fullName = response.fullName;
            fullName = fullName.split(/[\s,]+/);

            var firstName = fullName[0];
            var lastName = fullName[1]

            document.getElementById('cus_first_name').value = firstName;
            document.getElementById('cus_last_name').value = lastName;
            document.getElementById('cus_email').value = response.email;
            
        }
    })





    // -------------------------------------------------------------------------------------------------  \\
    //  Profile Update
    // -------------------------------------------------------------------------------------------------  \\
    $("#profile_update").click(function(e) 
    {
        e.preventDefault();
        var firstName = $("#cus_first_name").val();
        var lastName = $("#cus_last_name").val();
        var email = $("#cus_email").val();

        // Variable validations
        firstName = firstName.trim();
        lastName = lastName.trim();

        firstName = firstName.capitalize();
        lastName = lastName.capitalize();

        // checks user's inputs
        if(firstName != "" && lastName != "")
        {
            // Inserts new profile into the database
            $.ajax({
                url:'http://localhost/cut-it/view/api/api_customer_onclick.php',
                dataType: 'json',
                type:'POST',
                data: {'firstName':firstName, 'lastName':lastName, 'email':email},
                success: function (data){
                    console.log(data.response);
                    alert("Profile Update Successful!");
                    window.location.href="./account.html";
                },
                error: function (xhr,status,error) {
                    console.log(xhr.statusText + " " + status + " " + error);
                }
            }) 
        }
        else{ alert("Please insert your first name and last name");}
    });







    // -------------------------------------------------------------------------------------------------  \\
    //  Password Update
    // -------------------------------------------------------------------------------------------------  \\
    $("#account_change_password").click(function(e) 
    {
        e.preventDefault();
        var newPassword = $("#cus_new_password").val();
        var confirmPassword = $("#cus_confirm_password").val();
        var email = $("#cus_email").val();

        // checks user's inputs
        if(newPassword != "" && confirmPassword != "")
        {
            if(newPassword == confirmPassword)
            {
                // Inserts new password into the database
                $.ajax({
                    url:'http://localhost/cut-it/view/api/api_customer_onclick.php',
                    dataType: 'json',
                    type:'POST',
                    data: {'newPassword':newPassword, 'email':email},
                    success: function (data){
                        console.log(data.response);
                        alert("Password Update Successful!");
                        window.location.href="./account.html";
                    },
                    error: function (xhr,status,error) {
                        console.log(xhr.statusText + " " + status + " " + error);
                    }
                }) 
            }
            else{ alert("Password does not match.");} 
        }
        else{ alert("Please insert a new password.");}
    });






    // -------------------------------------------------------------------------------------------------  \\
    //  Page Sign Out
    // -------------------------------------------------------------------------------------------------  \\
    $("#sign_out").click(function(e) 
    {
        e.preventDefault();
        $.ajax({
            url:'http://localhost/cut-it/view/api/api_sign_out.php',
            dataType: 'json',
            type:'POST',
            data: {'customerSignOut':'signedOut'},
            success: function (data)
            {
                console.log(data.response);
                alert("Sign Out Successful!");
                window.location.href="../../v_authentication/log_in.html";
            },
            error: function () 
            {
                console.log("error");
            }
        }) 

    });


});