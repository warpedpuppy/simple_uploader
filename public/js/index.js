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
		    console.log(data)
		    $.ajax({
		        url: '/fileupload',
		        type: 'POST',
		        data: data,
		        cache: false,
		        //dataType: 'json',
		        processData: false, 
		        contentType: false,
		        success: function(data, textStatus, jqXHR)
		        {
		        	alert('success')
		            if(typeof data.error === 'undefined')
		            {
		                // Success so call function to process the form
		                //submitForm(event, data);
		                alert('success')
		            }
		            else
		            {
		                // Handle errors here
		                console.log('ERRORS 2: ' + data.error);
		            }
		        },
		        error: function(err, textStatus, errorThrown)
		        {
		            // Handle errors here
		            console.log('ERRORS: ' + errorThrown);
		            // for(let key in err) {
		            // 	console.log(`${key} in ${err[key]}`)
		            // }
		            //console.log('ERRORS: ' + textStatus);
		            //console.log('ERRORS: ' + errorThrown);
		            // STOP LOADING SPINNER
		        }
    		});
	})

})