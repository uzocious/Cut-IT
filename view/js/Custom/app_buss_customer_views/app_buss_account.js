
// -------------------------------------------------------------------------------------------------  \\
// Functions
// -------------------------------------------------------------------------------------------------  \\
function EditProfile()
{
    business_name.select();
    document.getElementById("business_name").readOnly = false;
    document.getElementById("buss_phone_no").readOnly = false;
}

function EditAddress()
{
    buss_address.select();
    document.getElementById("buss_address").readOnly = false;
    document.getElementById("buss_city").readOnly = false;
    document.getElementById("buss_county").readOnly = false;
    document.getElementById("buss_postcode").readOnly = false;
}

function EditBusinessInfo()
{
    business_latitude.select();
    document.getElementById("business_latitude").readOnly = false;
    document.getElementById("buss_longitude").readOnly = false;
    document.getElementById("buss_days").readOnly = false;
    document.getElementById("buss_times").readOnly = false;
}




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
            document.getElementById('buss_phone_no').value = "0" + response.businessPhoneNumber;
            document.getElementById('buss_email').value = response.email;

            document.getElementById('buss_address').value = response.businessAddress;
            document.getElementById('buss_city').value = response.businessCity.capitalize();
            document.getElementById('buss_county').value = response.businessCounty;
            document.getElementById('buss_postcode').value = response.businessPostCode;
        }
    })



    // Displays barber information (location and dates)
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_buss_customer_info.php',
        datatype:'json',
        success: function (data)
        {
            // Validates records from the database
            if(data.data != 0)
            {
                $.each(data.data,function (key,index)
                {
                    document.getElementById('business_latitude').value = index.latitude;
                    document.getElementById('buss_longitude').value = index.longitude;
                    document.getElementById('buss_days').value = index.opening_days;
                    document.getElementById('buss_times').value = index.opening_times;
                });
            }            
        }
    })



    // -------------------------------------------------------------------------------------------------  \\
    //  Business Profile Update
    // -------------------------------------------------------------------------------------------------  \\
    $("#buss_profile_update").click(function(e) 
    {
        e.preventDefault();
        var bussName = $("#business_name").val();
        var bussPhoneNum = $("#buss_phone_no").val();
        var bussEmail = $("#buss_email").val();

        // Variable validations
        bussName = bussName.trim();
        bussPhoneNum = bussPhoneNum.trim();
        bussPhoneNum = bussPhoneNum.substring(1);

        bussName = bussName.capitalize();

        // checks user's inputs
        if(bussName != "" && bussPhoneNum != "")
        {
            // Inserts new profile into the database
            $.ajax({
                url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
                dataType: 'json',
                type:'POST',
                data: {'bussName':bussName, 'bussPhoneNum':bussPhoneNum, 'bussEmail':bussEmail},
                success: function (data){
                    console.log(data.response);
                    alert("Profile Update Successful!");
                    window.location.href="./buss_account.html";
                },
                error: function (xhr,status,error) {
                    console.log(xhr.statusText + " " + status + " " + error);
                }
            }) 
        }
        else{ alert("Please insert your business name and phone number.");}
    });






    // -------------------------------------------------------------------------------------------------  \\
    //  Business Address Update
    // -------------------------------------------------------------------------------------------------  \\
    $("#buss_address_update").click(function(e) 
    {
        e.preventDefault();
        var bussAddress = $("#buss_address").val();
        var bussCity = $("#buss_city").val();
        var bussCounty = $("#buss_county").val();
        var bussCountry = $("#buss_country").val();
        var bussPostCode = $("#buss_postcode").val();
        var bussEmail = $("#buss_email").val();

        // Variable validations
        bussAddress = bussAddress.trim();
        bussCity = bussCity.trim();
        bussCounty = bussCounty.trim();
        bussPostCode = bussPostCode.trim();

        bussAddress = bussAddress.capitalize();
        bussCity = bussCity.toLowerCase();
        bussCounty = bussCounty.capitalize();
        bussPostCode = bussPostCode.toUpperCase();

        // checks user's inputs
        if(bussAddress != "" && bussCity != "" && bussCounty != "" && bussPostCode != "")
        {
            // Inserts address into the database
            $.ajax({
                url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
                dataType: 'json',
                type:'POST',
                data: {'bussAddress':bussAddress, 'bussCity':bussCity, 'bussCounty':bussCounty,
                 'bussCountry':bussCountry, 'bussPostCode':bussPostCode, 'bussEmail':bussEmail},
                success: function (data){
                    console.log(data.response);
                    alert("Address Update Successful!");
                    window.location.href="./buss_account.html";
                },
                error: function (xhr,status,error) {
                    console.log(xhr.statusText + " " + status + " " + error);
                }
            }) 
        }
        else{ alert("Please complete the address form.");}
    });






    // -------------------------------------------------------------------------------------------------  \\
    //  Business Information Update
    // -------------------------------------------------------------------------------------------------  \\
    $("#buss_info_update").click(function(e) 
    {
        e.preventDefault();
        var bussLatitude = $("#business_latitude").val();
        var bussLongitude = $("#buss_longitude").val();
        var bussDays = $("#buss_days").val();
        var bussTimes = $("#buss_times").val();
        var bussEmail = $("#buss_email").val();

        // Variable validations
        bussLatitude = bussLatitude.trim();
        bussLongitude = bussLongitude.trim();
        bussDays = bussDays.trim();
        bussTimes = bussTimes.trim();

        bussLatitude = parseFloat(bussLatitude);
        bussLongitude = parseFloat(bussLongitude);
        bussDays = bussDays.capitalize();
        bussTimes = bussTimes.capitalize();
        
        var bool1 = isNaN(bussLatitude)
        var bool2 = isNaN(bussLongitude)

        // checks user's inputs
        if(bussLatitude != "" && bussLongitude != "" && bussDays != "" && bussTimes != "")
        {
            if (bool1 == false && bool2 == false)
            {
                if (bussLatitude % 1 != 0 && bussLongitude % 1 != 0)
                {
                    // Inserts information into the database
                    $.ajax({
                        url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
                        dataType: 'json',
                        type:'POST',
                        data: {'bussLatitude':bussLatitude, 'bussLongitude':bussLongitude, 'bussDays':bussDays,
                        'bussTimes':bussTimes, 'bussEmail':bussEmail},
                        success: function (data){
                            console.log(data.response);
                            alert("Barber Information Update Successful!");
                            window.location.href="./buss_account.html";
                        },
                        error: function (xhr,status,error) {
                            console.log(xhr.statusText + " " + status + " " + error);
                        }
                    }) 
                }
                else
                { alert("Latitude or Longitude is not in the right format. (e.g. Latitude: 13.98434, Longitude: -0.83232)");}
            }
            else
            { alert("Latitude or Longitude is not in the right format. (e.g. Latitude: 13.98434, Longitude: -0.83232)")}
        }
        else{ alert("Please complete the form.");}
    });








    // -------------------------------------------------------------------------------------------------  \\
    //  Business Password Update
    // -------------------------------------------------------------------------------------------------  \\
    $("#buss_account_change_password").click(function(e) 
    {
        e.preventDefault();
        var newPassword = $("#buss_new_password").val();
        var confirmPassword = $("#buss_confirm_password").val();
        var bussEmail = $("#buss_email").val();

        // checks user's inputs
        if(newPassword != "" && confirmPassword != "")
        {
            if(newPassword == confirmPassword)
            {
                // Inserts new password into the database
                $.ajax({
                    url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
                    dataType: 'json',
                    type:'POST',
                    data: {'newPassword':newPassword, 'bussEmail':bussEmail},
                    success: function (data){
                        console.log(data.response);
                        alert("Password Update Successful!");
                        window.location.href="./buss_account.html";
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