

// Displays all offers from database
$.ajax({
    url: 'http://localhost/cut-it/view/api/api_buss_customer_offers.php',
    datatype:'json',
    success: function (data)
    {
        // Validates records from the database
        if(data.data != 0)
        {
            $.each(data.data,function (key,index)
            {
                var offerID = index.id;
                var offerTitle = index.DealTitle;
                var offerDescription = index.DealDescription;

                // Creating html elements
                var Result = document.createElement("DIV");
                var OfferTitle = document.createElement("H4");
                var OfferDescription = document.createElement("H6");
                var DeleteOffer = document.createElement("BUTTON");

                // Creating text nodes
                var ot = document.createTextNode(offerTitle);
                var od = document.createTextNode(offerDescription);
                var de = document.createTextNode("Delete");

                // Appending children
                OfferTitle.appendChild(ot);
                OfferDescription.appendChild(od);
                DeleteOffer.appendChild(de);
                
                // Setting delete button attribute
                DeleteOffer.setAttribute("id","deleteButton");
                DeleteOffer.setAttribute("name", offerID);
                DeleteOffer.setAttribute("onclick", "deleteOffer(event);");


                // Appending all children to result
                Result.setAttribute("class","offers_result");
                Result.appendChild(OfferTitle);
                Result.appendChild(OfferDescription);
                Result.appendChild(DeleteOffer);


                // Displaying results
                document.getElementById("offers_list").appendChild(Result);

            });
        }           
    },
    error: function ()
    {
        var ErrorMessage = document.createElement("P");
        var message = document.createTextNode("You have no offers.");
        ErrorMessage.appendChild(message);
        document.getElementById("offers_list").appendChild(ErrorMessage);
    }
})



function deleteOffer(event)
{
    var completed = event.target;
    var id = completed.getAttribute('name');

    // Deleting record using id
    $.ajax({
        url:'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
        dataType: 'json',
        type:'POST',
        data: {'offerIdNumber':id},
        success: function (data)
        {
            console.log(data.response);
            alert("Offer Successfully Deleted!");
            window.location.href="./buss_offers.html";
        },
        error: function (xhr,status,error) {
            console.log(xhr.statusText + " " + status + " " + error);
        }
    }) 
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
        }
    })




    // -------------------------------------------------------------------------------------------------  \\
    // Add Offer
    // -------------------------------------------------------------------------------------------------  \\
    $("#add_offers").click(function(e)
    {
        e.preventDefault();
        var offerTitle = $("#title").val();
        var offerDescription = $("#description").val();

        // Variable validations
        offerTitle = offerTitle.trim();
        offerDescription = offerDescription.trim();

        offerTitle = offerTitle.capitalize();
        offerDescription = offerDescription.capitalize();

        // checks user's inputs
        if(offerTitle != "" && offerDescription != "")
        {
            if (!offerTitle.includes("£") && !offerDescription.includes("£"))
            {
                $.ajax({
                    url: 'http://localhost/cut-it/view/api/api_buss_customer_onclick.php',
                    data: {'offerTitle':offerTitle, 'offerDescription':offerDescription},
                    datatype:'json',
                    type:'POST',
                    success: function (data)
                    {
                        console.log(data.response);
                        alert("Offer Added Successfully!");
                        window.location.href="./buss_offers.html";
                    },
                    error: function (xhr,status,error) {
                        console.log(xhr.statusText + " " + status + " " + error);
                    }
                })
            }
            else{ alert("The sign '£' is not allowed. Replace with the word 'Pounds'.");}
        }
        else{ alert("Please complete the form.");}
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