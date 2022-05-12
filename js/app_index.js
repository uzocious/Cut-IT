$(document).ready(function() {

    console.log("device ready");

    // -------------------------------------------------------------------------------------------------  \\
    //  Automatically Sign In
    // -------------------------------------------------------------------------------------------------  \\
    $.ajax({
        url:'http://localhost/cut-it/view/api/api_automatic_sign_in.php',
        dataType: 'json',
        type:'POST',
        data: {'autoSignIn':'signIn'},
        success: function (data)
        {
            console.log(data.response);
            if(data.response == "activated_c")
            {
                window.location.href="./view/v_customer/index.html";
            }
            else if( data.response == "activated_bc")
            {
                window.location.href="./view/v_buss_customer/index.html";
            }
        }
    }) 

    

    

});