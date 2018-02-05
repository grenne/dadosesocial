  var reader;

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
   
  function abortRead() {
    reader.abort();
  }

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function handleFileSelect(evt) {

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      console.log ("passou aqui");
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
       var text = e.target.result;
       var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
 	   processaRegistros(lines);
    }

    // Read in the image file as a binary string.
    reader.readAsBinaryString(evt.target.files[0]);
  }
  
  function processaRegistros (data, lines){
		
	var register = data[0];
	var fields = register.split(";");
	var collection = fields[0];
	var register = data[1];
	var fields = register.split(";");
	sessionStorage.lenght = data.length;
	sessionStorage.index = 0;
	
	setInterval(function(){
		var i = sessionStorage.index;
		var iInt = parseInt(i);
		var lenghtInt = parseInt(sessionStorage.lenght);
		if (iInt > lenghtInt){
			alert ("estourou");
		}else{
			var values = data[i].split(";");
			var virgula = "";
			var objJson = 
				'{' +
				'"async" : "false",' +
				'"collection" : "' + collection + '",' +
				'"insert" :' +
					'{' +
					'"documento" :{'; 
			for (var j = 0; j < values.length; j++) {
				if (values != ""){
					objJson = objJson + virgula + '"' + fields[j] + '":"' + limpaData(values[j])  + '"';
				};
				virgula= ",";
			};		
			objJson = objJson + "}}}";
			var objJsonParsed =  JSON.parse(objJson);
			$.ajax({
				type: "POST",
		        url: window.location.origin + "/dadosesocial/rest/crud/incluir",
		        contentType: "application/json; charset=utf-8",
		        dataType: 'json',
		        data : JSON.stringify(objJsonParsed),
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
			++i;
			sessionStorage.index = i;
			
			if (i > sessionStorage.lenght){
				window.clearInterval(i);
			};
		};
	}	, 50);
  };
