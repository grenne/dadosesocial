var url   = window.location.search.replace();
var parametrosDaUrl = url.split("?")[1];
var alteraDados = "true";
var parametros = "";
var matricula = "";
var token = "";
if (parametrosDaUrl){
	var n = parametrosDaUrl.search("&");
	if (n != "-1"){
		parametros = parametrosDaUrl.split("&");
		if (parametros){
			if (parametros[1]){
				if (parametros[1] == "lista"){
					alteraDados = "false";
				};
			};
			token = parametros[0];
		}else{
			parametros = parametrosDaUrl;
		}
	}else{
		token = parametrosDaUrl;
	};
};

var data = acessaToken(token);
if (data){
	
}else{
//	alert ("Problemas no seu login, se logue novamente");
//	$(window.document.location).attr('href','login.html');
}

// Validation
$(function() {
	// Validation
	$("#smart-form-register").validate({

		// Rules for form validation
		rules : {
			password : {
				required : true,
				minlength : 3,
				maxlength : 20
			},
			passwordConfirm : {
				required : true,
				minlength : 3,
				maxlength : 20,
				equalTo : '#password'
			}
		},

		// Messages for form validation
		messages : {
			password : {
				required : 'Informe sua nova senha'
			},
			passwordConfirm : {
				required : 'Confirme a nova senha',
				equalTo : 'Confirmação deve ser igual nova senha'
			}
		},

		// Ajax form submition
		submitHandler : function(form) {
			var senha = "";
			$.each(form, function (i, field) {
				var value = field.value;
				if (field.name == "password"){
					senha = field.value; 
				}
			});
			data.documnto.senha = senha;
			crudAtualizaDoc(data, "funcionarios", "documento.matricula", data.documento.matricula);
			sessionStorage.user = data.documento.perfil;
			sessionStorage.login = data.documento.matricula;
			$(window.document.location).attr('href','index.html');
		},

		// Do not change code below
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
		}
	});

});
