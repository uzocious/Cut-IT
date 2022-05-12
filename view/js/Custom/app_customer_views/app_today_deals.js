

// -------------------------------------------------------------------------------------------------  \\
// Local Variables
// -------------------------------------------------------------------------------------------------  \\
var dateNow = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[dateNow.getMonth()];
var date = dateNow.getDate();
var year = dateNow.getFullYear();
var today_date = `${date} ${month} ${year}`;



// Displays deals from database
$.ajax({
    url: 'http://localhost/cut-it/view/api/api_customer_today_deals.php',
    datatype:'json',
    success: function (data)
    {
        // Validates records from the database
        if(data.data != 0)
        {
            $.each(data.data,function (key,index)
            {
                var head = index.DealTitle;
                var context = index.DealDescription;
                var name = index.Name;
                var businessEmail = index.BusinessEmail;

                // Creating html elements
                var Result = document.createElement("DIV");
                var DealTitle = document.createElement("H4");
                var DealDescription = document.createElement("H6");
                var barberName = document.createElement("H6");

                // Creating text nodes
                var hd = document.createTextNode(head);
                var con = document.createTextNode(context);
                var nm = document.createTextNode(name);

                // Appending children
                DealTitle.appendChild(hd);
                DealDescription.appendChild(con);
                barberName.appendChild(nm);

                // Setting barber name attribute
                barberName.setAttribute("class","caps");
                

                // Appending all children to result
                Result.setAttribute("class","deals_result");
                Result.setAttribute("value", businessEmail);
                Result.setAttribute("onclick", "send(event);");
                Result.appendChild(DealTitle);
                Result.appendChild(DealDescription);
                Result.appendChild(barberName);

                // Displaying results
                document.getElementById("deals_list").appendChild(Result);

            });
        }           
    },
    error: function ()
    {
        var ErrorMessage = document.createElement("P");
        var message = document.createTextNode("Aww!!! There are no deals today.");
        ErrorMessage.appendChild(message);
        document.getElementById("deals_list").appendChild(ErrorMessage);
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
        data: {'postFromTodayDeals':'todayDeals', 'businessEmail':email},
        success: function ()
        {
            window.location.href="./barber_details.html";
        }
    }) 
}



$(document).ready(function() {

    document.getElementById("deal_current_date").innerHTML = today_date;

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