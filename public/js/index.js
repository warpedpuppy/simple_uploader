$(function(){

	let files;
	$('input[type=file]').on('change', prepareUpload);
	function prepareUpload (event) {
	  files = event.target.files;
	}


	$("#uploadForm").submit(function(e){
		e.preventDefault();

		  var data = new FormData();
		    $.each(files, function(key, value) {
		        data.append(key, value);
		    });
		    data.append('testText', 'testing123');
		    data.append('testSelect', $("select[name=testSelect]").val())

		    $.ajax({
		        url: '/fileupload',
		        type: 'POST',
		        data: data,
		        cache: false,
		        dataType: 'json',
		        processData: false, 
		        contentType: false,
		        success: function(data, textStatus, jqXHR)
		        {
		            if(typeof data.error === 'undefined')
		            {
		                // Success so call function to process the form
		                //submitForm(event, data);
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