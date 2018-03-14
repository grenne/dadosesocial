			$.ajax({
		        url: window.location.origin + "/dadosesocial/rest/email/mandaemails",
		        contentType: "application/json; charset=utf-8",
		        dataType: 'json',
				async : "false"
			})        	
			.done(function( data ) {
				console.log ("processou");
			})
			.fail(function(data) {
				console.log ("falhou");
			})
			.always(function(data) {
			});		
