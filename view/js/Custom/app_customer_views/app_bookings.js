
// -------------------------------------------------------------------------------------------------  \\
// Functions
// -------------------------------------------------------------------------------------------------  \\
// Shortens string using ellipses (...)
String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '...' : this;
      };




// Deletes appointment
function deleteAppointment(event)
{
    var completed = event.target;
    var id = completed.getAttribute('name');
    
    // Deleting record using booking id
    $.ajax({
        url:'http://localhost/cut-it/view/api/api_customer_onclick.php',
        dataType: 'json',
        type:'POST',
        data: {'bookingIdNumber':id},
        success: function (data)
        {
            console.log(data.response);
            alert("Appointment Successfully Deleted!");
            window.location.href="./bookings.html";
        },
        error: function (xhr,status,error) {
            console.log(xhr.statusText + " " + status + " " + error);
        }
    }) 
}



// Displays all customer's appointments from database
$.ajax({
    url: 'http://localhost/cut-it/view/api/api_customer_bookings.php',
    datatype:'json',
    success: function (data)
    {
        // Validates records from the database
        if(data.data != 0)
        {
            $.each(data.data,function (key,index)
            {
                var bookingID = index.id;
                var businessName = index.Name;
                var appointmentDate = index.date;
                var appointmentTime = index.time;
                var appointmentDescription = index.description;

                // Truncating results
                businessName = businessName.trunc(33);
                appointmentDate = appointmentDate.trunc(40);
                appointmentTime = appointmentTime.trunc(45);

                // Creating html elements
                var Result = document.createElement("DIV");
                var BusinessName = document.createElement("H5");
                var AppointmentDate = document.createElement("H6");
                var AppointmentTime = document.createElement("H6");
                var AppointmentDescription = document.createElement("H6");
                var DeleteButton = document.createElement("BUTTON");

                // Creating text nodes
                var name = document.createTextNode(businessName);
                var date = document.createTextNode(appointmentDate);
                var tym = document.createTextNode(appointmentTime);
                var desc = document.createTextNode(appointmentDescription);
                var btn = document.createTextNode("Delete");

                // Appending children
                BusinessName.appendChild(name);
                AppointmentDate.appendChild(date);
                AppointmentTime.appendChild(tym);
                AppointmentDescription.appendChild(desc);
                DeleteButton.appendChild(btn);
                
                // Setting delete button attribute
                DeleteButton.setAttribute("id","deleteButton");
                DeleteButton.setAttribute("name","" + bookingID);
                DeleteButton.setAttribute("onclick", "deleteAppointment(event);");


                // Appending all children to result
                Result.setAttribute("class","booking_result");
                Result.appendChild(BusinessName);
                Result.appendChild(AppointmentDate);
                Result.appendChild(AppointmentTime);
                Result.appendChild(AppointmentDescription);
                Result.appendChild(DeleteButton);


                // Displaying results
                document.getElementById("booking_list").appendChild(Result);

            });
        }           
    },
    error: function ()
    {
        var ErrorMessage = document.createElement("P");
        var message = document.createTextNode("You have no booked appointments.");
        ErrorMessage.appendChild(message);
        document.getElementById("booking_list").appendChild(ErrorMessage);
    }
})







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
        }
    })




    // -------------------------------------------------------------------------------------------------  \\
    // Book Appointment
    // -------------------------------------------------------------------------------------------------  \\
    $("#bookings_submit").click(function(e)
    {
        e.preventDefault();
        var bussEmail = $("#buss_email").val();
        var bookDate = $("#booking_date").val();
        var bookTime = $("#booking_time").val();
        var bookDescription = $("#booking_description").val();

        // Variable validations
        bussEmail = bussEmail.trim();
        bookDate = bookDate.trim();
        bookTime = bookTime.trim();
        bookDescription = bookDescription.trim();

        bussEmail = bussEmail.toLowerCase();
        bookDate = bookDate.capitalize();
        bookTime = bookTime.capitalize();
        bookDescription = bookDescription.capitalize();

        // checks user's inputs
        if(bussEmail != "" && bookDate != "" && bookTime != "" && bookDescription != "")
        {
            $.ajax({
                url: 'http://localhost/cut-it/view/api/api_authentication.php',
                data: {show_email:'email', email:bussEmail},
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
                            if(index.Email != undefined)
                            {
                                alert("There is no barber registered with this email.");
                            }
                            else if (index.BusinessEmail != undefined)
                            {
                                // Confirmation that business email exists
                                // Inserts booking details into the database
                                $.ajax({
                                    url:'http://localhost/cut-it/view/api/api_customer_onclick.php',
                                    dataType: 'json',
                                    type:'POST',
                                    data: {'bussEmail':bussEmail, 'bookDate':bookDate, 'bookTime':bookTime, 'bookDescription':bookDescription },
                                    success: function (data)
                                    {
                                        console.log(data.response);
                                        alert("Appointment Booked Successfully!");
                                        window.location.href="./bookings.html";
                                    },
                                    error: function (xhr,status,error) {
                                        console.log(xhr.statusText + " " + status + " " + error);
                                    }
                                }) 
                            }
                        });
                    }
                },
                error: function () 
                {
                    alert("There is no barber registered with this email.");
                }
            })
        }
        else{ alert("Please complete the form.");}
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






