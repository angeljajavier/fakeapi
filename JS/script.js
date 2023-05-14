function basic() 
{
	$(document).delegate("#btnBasicResponse", "click", function() {

		// Ajax config
		$.ajax({
	        type: "GET", //we are using GET method to get data from server side
	        url: 'basic.php', // get the route value
	        success: function (response) {//once the request successfully process to the server side it will return result here
	            //parse json
	            response = JSON.parse(response);

	            console.log(response);
	            console.log("First Name:" + response.first_name);
	        }
	    });

	});

}
function get() 
{
	$(document).delegate("[data-target='#edit-employee-modal']", "click", function() {

		var employeeId = $(this).attr('data-id');

		// Ajax config
		$.ajax({
	        type: "GET", //we are using GET method to get data from server side
	        url: 'get.php', // get the route value
	        data: {employee_id:employeeId}, //set data
	        beforeSend: function () {//We add this before send to disable the button once we submit it so that we prevent the multiple click
	            
	        },
	        success: function (response) {//once the request successfully process to the server side it will return result here
	            response = JSON.parse(response);
	            $("#edit-form [name=\"id\"]").val(response.id);
	            $("#edit-form [name=\"email\"]").val(response.email);
	            $("#edit-form [name=\"first_name\"]").val(response.first_name);
	            $("#edit-form [name=\"last_name\"]").val(response.last_name);
	            $("#edit-form [name=\"address\"]").val(response.address);
	        }
	    });
	});
}

function all() 
{
	// Ajax config
	$.ajax({
        type: "GET", //we are using GET method to get all record from the server
        url: 'all.php', // get the route value
        success: function (response) {//once the request successfully process to the server side it will return result here
            
            // Parse the json result
        	response = JSON.parse(response);

        	if(response.length) {
        		$.each(response, function(key,value) {
        			console.log(value.first_name + " " + value.last_name);
        		});
        	}
        }
    });
}

function all() 
{
	// Ajax config
	$.ajax({
        type: "GET", //we are using GET method to get all record from the server
        url: 'all.php', // get the route value
        success: function (response) {//once the request successfully process to the server side it will return result here
            
            // Parse the json result
        	response = JSON.parse(response);

            var html = "";
            // Check if there is available records
            if(response.length) {
            	html += '<div class="list-group">';
	            // Loop the parsed JSON
	            $.each(response, function(key,value) {
	            	// Our employee list template
					html += '<a href="#" class="list-group-item list-group-item-action">';
					html += "<p>" + value.first_name +' '+ value.last_name + " <span class='list-email'>(" + value.email + ")</span>" + "</p>";
					html += "<p class='list-address'>" + value.address + "</p>";
					html += "<button class='btn btn-sm btn-primary mt-2' data-toggle='modal' data-target='#edit-employee-modal' data-id='"+value.id+"'>Edit</button>";
					html += "<button class='btn btn-sm btn-danger mt-2 ml-2 btn-delete-employee' data-id='"+value.id+"' typle='button'>Delete</button>";
					html += '</a>';
	            });
	            html += '</div>';
            } else {
            	html += '<div class="alert alert-warning">';
				  html += 'No records found!';
				html += '</div>';
            }

            // Insert the HTML Template and display all employee records
			$("#employees-list").html(html);
        }
    });
}
