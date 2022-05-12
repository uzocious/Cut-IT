// -------------------------------------------------------------------------------------------------  \\
// Functions
// -------------------------------------------------------------------------------------------------  \\
// Capitalizing
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



// Displays barbers for hire from database
$.ajax({
    url: 'http://localhost/cut-it/view/api/api_customer_barbers.php',
    datatype:'json',
    success: function (data)
    {
        // Validates records from the database
        if(data.data != 0)
        {
            $.each(data.data,function (key,index)
            {
                var name = index.Name;
                var city = index.City;
                var postcode = index.PostCode;
                var businessEmail = index.BusinessEmail;

                city = city.capitalize();
                var city_postcode = city + ", " + postcode;
                
                // Creating html elements
                var Result = document.createElement("DIV");
                var firstDIV = document.createElement("DIV")
                var secondDIV = document.createElement("DIV")
                var ImageFile = document.createElement("IMG");
                var barberName = document.createElement("H5");
                var barberAddress = document.createElement("H6");
                var barberEmail = document.createElement("H6");

                // Creating text nodes
                var nm = document.createTextNode(name);
                var cp = document.createTextNode(city_postcode);
                var be = document.createTextNode(businessEmail);

                // Appending children
                ImageFile.setAttribute("src", "../img/barber.jpg");
                barberName.appendChild(nm);
                barberAddress.appendChild(cp);
                barberEmail.appendChild(be);

                firstDIV.appendChild(ImageFile);
                secondDIV.appendChild(barberName);
                secondDIV.appendChild(barberAddress);
                secondDIV.appendChild(barberEmail);
                

                // Appending all children to result
                Result.setAttribute("class","barber_search_result");
                Result.setAttribute("value", businessEmail);
                Result.setAttribute("onclick", "send(event);");
                Result.appendChild(firstDIV);
                Result.appendChild(secondDIV);

                // Displaying results
                document.getElementById("barber_list").appendChild(Result);

            });
        }           
    },
    error: function ()
    {
        var ErrorMessage = document.createElement("P");
        var message = document.createTextNode("Aww!!! There are no barbers.");
        ErrorMessage.appendChild(message);
        document.getElementById("barber_list").appendChild(ErrorMessage);
    }
})



function send(event)
{
    var completed = event.currentTarget;
    var email = completed.getAttribute('value');

    $.ajax({
        url:'http://localhost/cut-it/view/api/api_customer_barber_details.php',
        dataType: 'json',
        type:'POST',
        data: {'postFromBarber':'barber', 'businessEmail3':email},
        success: function ()
        {
            window.location.href="./barber_details.html";
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





    // -------------------------------------------------------------------------------------------------  \\
    //  Search for Barber
    // -------------------------------------------------------------------------------------------------  \\
    $("#location_search").click(function(e) 
    {
        e.preventDefault();
        var location = $("#location").val();

        // Variable validations
        location = location.trim();
        location = location.toLowerCase();

        if(location != "")
        {
            // Clearing list barbers
            var parts = document.getElementById("barber_list");
            while(parts.firstChild)
            {
                parts.removeChild(parts.firstChild);
            }

            $.ajax({
                url:'http://localhost/cut-it/view/api/api_customer_onclick.php',
                dataType: 'json',
                type:'POST',
                data: {'barberSearchWord':'searchedWord', 'barber':location},
                success: function (data)
                {
                    // Validates records from the database
                    if(data.data != 0)
                    {
                        $.each(data.data,function (key,index)
                        {
                            var name = index.Name;
                            var city = index.City;
                            var postcode = index.PostCode;
                            var businessEmail = index.BusinessEmail;

                            city = city.capitalize();
                            var city_postcode = city + ", " + postcode;
                            
                            // Creating html elements
                            var Result = document.createElement("DIV");
                            var firstDIV = document.createElement("DIV")
                            var secondDIV = document.createElement("DIV")
                            var ImageFile = document.createElement("IMG");
                            var barberName = document.createElement("H5");
                            var barberAddress = document.createElement("H6");
                            var barberEmail = document.createElement("H6");

                            // Creating text nodes
                            var nm = document.createTextNode(name);
                            var cp = document.createTextNode(city_postcode);
                            var be = document.createTextNode(businessEmail);

                            // Appending children
                            ImageFile.setAttribute("src", "../img/barber.jpg");
                            barberName.appendChild(nm);
                            barberAddress.appendChild(cp);
                            barberEmail.appendChild(be);

                            firstDIV.appendChild(ImageFile);
                            secondDIV.appendChild(barberName);
                            secondDIV.appendChild(barberAddress);
                            secondDIV.appendChild(barberEmail);
                            

                            // Appending all children to result
                            Result.setAttribute("class","barber_search_result");
                            Result.setAttribute("value", businessEmail);
                            Result.setAttribute("onclick", "send(event);");
                            Result.appendChild(firstDIV);
                            Result.appendChild(secondDIV);

                            // Displaying results
                            document.getElementById("barber_list").appendChild(Result);

                        });
                    } 
                },
                error: function ()
                {
                    var ErrorMessage = document.createElement("P");
                    var RefreshPage = document.createElement("A");
                    var BR1 = document.createElement("BR");
                    var BR2 = document.createElement("BR");

                    var message = document.createTextNode("There are no search results found.");
                    var refresh = document.createTextNode("<< Return");
                    
                    RefreshPage.setAttribute("href", "./barbers.html");

                    ErrorMessage.appendChild(message);
                    RefreshPage.appendChild(refresh);

                    document.getElementById("barber_list").appendChild(BR1);
                    document.getElementById("barber_list").appendChild(BR2);
                    document.getElementById("barber_list").appendChild(ErrorMessage);
                    document.getElementById("barber_list").appendChild(RefreshPage);
                }
            })
        }
        else { window.location.href = "./barbers.html";}

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