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
var objJson = {
		collection : "token",
		keys : [
			{
				key : "documento.token",
				value : token
			} 
			]
	};

sessionStorage.matricula = "";
$.ajax({
	type: "POST",
    url: window.location.origin + "/dadosesocial/rest/crud/obter",
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data : JSON.stringify(objJson),
	async : "false"
})        	
.done(function( data) {
	if (data){
		sessionStorage.matricula = data.documento.matricula;				
		sessionStorage.user = data.documento.perfil;
		sessionStorage.login = data.documento.matricula;
	}
})
.fail(function(data) {
})
.always(function(data) {
});		

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
			if (sessionStorage.matricual = ""){
				alert ("token inválido, faça o login novamente");
				$(window.document.location).attr('href','login.html');	
			};
			crudAtualizaDoc("senha", senha, "funcionarios", "documento.matricula", sessionStorage.matricula);
			crudAtualizaDoc("mudarSenha", "", "funcionarios", "documento.matricula", sessionStorage.matricula);
			setTimeout(function(){$(window.document.location).attr('href','index.html');}, 1000);
		},

		// Do not change code below
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
		}
	});

});
