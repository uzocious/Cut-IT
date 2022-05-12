

$(document).ready(function() {

    // Capitalizing
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }



    // Displays business' name
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_buss_customer.php',
        datatype:'json',
        success: function (data)
        {
            var response = data.data;
            document.getElementById('buss_name').innerHTML = response.businessName;
            document.getElementById('business_name').value = response.businessName;
            document.getElementById('buss_email').value = response.email;
        }
    })




    // -------------------------------------------------------------------------------------------------  \\
    // Help Message
    // -------------------------------------------------------------------------------------------------  \\
    $("#buss_help_submit").click(function(e) 
    {
        e.preventDefault();
        var buss_name = $("#business_name").val();
        var buss_email = $("#buss_email").val();
        var buss_message = $("#buss_message").val();

        // Variable validations
        buss_name = buss_name.trim();
        buss_email = buss_email.trim();
        buss_message = buss_message.trim();

        buss_message = buss_message.capitalize();

        // checks user's inputs
        if(buss_message != "")
        {
            // Inserts message into the database
            $.ajax({
                url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
                dataType: 'json',
                type:'POST',
                data: {'name':buss_name, 'email':buss_email, 'message':buss_message},
                success: function (data){
                    console.log(data.response);
                    alert("Message Sent Successfully!");
                    window.location.href="./buss_help.html";
                },
                error: function (xhr,status,error) {
                    console.log(xhr.statusText + " " + status + " " + error);
                }
            }) 
        }
        else{ alert("Please let us know what you want in the message box.");}
    });




    // -------------------------------------------------------------------------------------------------  \\
    //  Page Sign Out
    // -------------------------------------------------------------------------------------------------  \\
    $("#buss_sign_out").click(function(e) 
    {
        e.preventDefault();
        $.ajax({
            url:'http://localhost/cut-it/view/api/api_sign_out.php',
            dataType: 'json',
            type:'POST',
            data: {'bussCustomerSignOut':'signedOut'},
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