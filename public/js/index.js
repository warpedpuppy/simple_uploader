$(function(){

	let files;
	$('input[type=file]').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload (event) {
	  files = event.target.files;
	}


	$("#uploadForm").submit(function(e){
		e.preventDefault();

		  var data = new FormData();

		    $.each(files, function(key, value) {
		        data.append(key, value);
		    });

		    $.ajax({
		        url: '/fileupload',
		        type: 'POST',
		        data: data,
		        cache: false,
		        dataType: 'json',
		        processData: false, // Don't process the files
		        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		        success: function(data, textStatus, jqXHR)
		        {
		            if(typeof data.error === 'undefined')
		            {
		                // Success so call function to process the form
		                submitForm(event, data);
		            }
		            else
		            {
		                // Handle errors here
		                console.log('ERRORS 2: ' + data.error);
		            }
		        },
		        error: function(jqXHR, textStatus, errorThrown)
		        {
		            // Handle errors here
		            console.log('ERRORS: ' + jqXHR);
		            console.log('ERRORS: ' + textStatus);
		            console.log('ERRORS: ' + errorThrown);
		            // STOP LOADING SPINNER
		        }
    		});
	})

})