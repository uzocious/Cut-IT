

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
            document.getElementById('cus_name').value = response.fullName;
            document.getElementById('cus_email').value = response.email;
        }
    })



    // -------------------------------------------------------------------------------------------------  \\
    // Help Message
    // -------------------------------------------------------------------------------------------------  \\
    $("#help_submit").click(function(e) 
    {
        e.preventDefault();
        var name = $("#cus_name").val();
        var email = $("#cus_email").val();
        var message = $("#cus_message").val();

        // Variable validations
        name = name.trim();
        email = email.trim();
        message = message.trim();

        message = message.capitalize();

        // checks user's inputs
        if(message != "")
        {
            // Inserts message into the database
            $.ajax({
                url:'http://localhost/cut-it/view/api/api_customer_onclick.php',
                dataType: 'json',
                type:'POST',
                data: {'name':name, 'email':email, 'message':message},
                success: function (data){
                    console.log(data.response);
                    alert("Message Sent Successfully!");
                    window.location.href="./help.html";
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