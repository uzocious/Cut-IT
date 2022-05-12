

// Displays all appointments from database
$.ajax({
    url: 'http://localhost/cut-it/view/api/api_buss_customer_appointments.php',
    datatype:'json',
    success: function (data)
    {
        // Validates records from the database
        if(data.data != 0)
        {
            $.each(data.data,function (key,index)
            {
                var appointmentID = index.id;
                var appointmentFullName = index.FirstName + " " + index.LastName;
                var appointmentDate = index.date;
                var appointmentTime = index.time;
                var appointmentDescription = index.description;

                // Creating html elements
                var Result = document.createElement("DIV");
                var AppointmentFullName = document.createElement("H5");
                var AppointmentDate = document.createElement("H6");
                var AppointmentTime = document.createElement("H6");
                var AppointmentDescription = document.createElement("H6");
                var DeleteButton = document.createElement("BUTTON");

                // Creating text nodes
                var afn = document.createTextNode(appointmentFullName);
                var ad = document.createTextNode(appointmentDate);
                var at = document.createTextNode(appointmentTime);
                var adp = document.createTextNode(appointmentDescription);
                var db = document.createTextNode("Delete");

                // Appending children
                AppointmentFullName.appendChild(afn);
                AppointmentDate.appendChild(ad);
                AppointmentTime.appendChild(at);
                AppointmentDescription.appendChild(adp);
                DeleteButton.appendChild(db);
                
                // Setting delete button attribute
                DeleteButton.setAttribute("id","deleteButton");
                DeleteButton.setAttribute("name", appointmentID);
                DeleteButton.setAttribute("onclick", "deleteAppointment(event);");

                // Appending all children to result
                Result.setAttribute("class","appointment_result");
                Result.appendChild(AppointmentFullName);
                Result.appendChild(AppointmentDate);
                Result.appendChild(AppointmentTime);
                Result.appendChild(AppointmentDescription);
                Result.appendChild(DeleteButton);


                // Displaying results
                document.getElementById("appointment_list").appendChild(Result);

            });
        }           
    },
    error: function ()
    {
        var ErrorMessage = document.createElement("P");
        var message = document.createTextNode("You have no appointments.");
        ErrorMessage.appendChild(message);
        document.getElementById("appointment_list").appendChild(ErrorMessage);
    }
})



function deleteAppointment(event)
{
    var completed = event.target;
    var id = completed.getAttribute('name');

    // Deleting record using id
    $.ajax({
        url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
        dataType: 'json',
        type:'POST',
        data: {'appointmentIdNumber':id},
        success: function (data)
        {
            console.log(data.response);
            alert("Appointment Successfully Deleted!");
            window.location.href="./buss_appointments.html";
        },
        error: function (xhr,status,error) {
            console.log(xhr.statusText + " " + status + " " + error);
        }
    }) 
}




$(document).ready(function() {

    // Displays business name
    $.ajax({
        url: 'http://localhost/cut-it/view/api/api_buss_customer.php',
        datatype:'json',
        success: function (data)
        {
            var response = data.data;
            document.getElementById('buss_name').innerHTML = response.businessName;
        }
    })





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