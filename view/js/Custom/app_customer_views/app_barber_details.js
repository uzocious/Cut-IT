
// Google Maps
function initMap() 
{
    // Displays business information
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_customer_barber_details.php',
        datatype:'json',
        success: function (data)
        {
            // Validates records from the database
            if(data.data != 0)
            {
                $.each(data.data,function (key,index)
                {
                    var latitude = index.latitude;
                    var longitude = index.longitude;

                    latitude = parseFloat(latitude);
                    longitude = parseFloat(longitude);

                    // The location of Uluru
                    var uluru = {lat: latitude, lng: longitude};
                    // The map, centered at Uluru
                    var map = new google.maps.Map(
                        document.getElementById('map'), {zoom: 15, center: uluru});
                    // The marker, positioned at Uluru
                    var marker = new google.maps.Marker({position: uluru, map: map});
                });
            }
        }
    })   
}




$(document).ready(function() {

    // Displays customer's full name
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_customer.php',
        datatype:'json',
        success: function (data)
        {
            var response = data.data;
            document.getElementById('cus_full_name').innerHTML = response.fullName;
        }
    })



    // Displays business information
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_customer_barber_details.php',
        datatype:'json',
        success: function (data)
        {
            // Validates records from the database
            if(data.data != 0)
            {
                $.each(data.data,function (key,index)
                {
                    document.getElementById('barber_name').innerHTML = index.Name;
                    document.getElementById('barber_email').innerHTML = index.BusinessEmail;
                    document.getElementById('barber_email_link').href = "mailto:" + index.BusinessEmail;
                    document.getElementById('barber_number').innerHTML = "0" + index.PhoneNumber;
                    document.getElementById('barber_number_link').href = "tel:0" + index.PhoneNumber;

                    document.getElementById('barber_address').innerHTML = index.Address;
                    document.getElementById('barber_city').innerHTML = index.City;
                    document.getElementById('barber_county').innerHTML = index.County;
                    document.getElementById('barber_country').innerHTML = index.Country;
                    document.getElementById('barber_postcode').innerHTML = index.PostCode;

                    document.getElementById('barber_openingTimes').innerHTML = index.opening_times;
                    document.getElementById('barber_days').innerHTML = index.opening_days;
                });
            }
        }
    })






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


