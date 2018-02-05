/**
 * 
 */

sessionStorage.logout = "false";

			$(function() {
				// Validation
				$("#login-form").validate({
					// Rules for form validation
					rules : {
						usuario : {
							required : true,
						},
						password : {
							required : true,
							minlength : 3,
							maxlength : 20
						}
					},

					// Messages for form validation
					messages : {
						usuario : {
							required : 'Informe o usuario',
						},
						password : {
							required : 'Informe a senha'
						}
					},

					// Ajax form submition
					submitHandler : function(form) {
						var usuario = "";
						var senha = "";
						$.each(form, function (i, field) {
							var value = field.value;
							if (field.name == "usuario"){
								usuario = field.value; 
							}
							var value = field.value;
							if (field.name == "password"){
								senha = field.value; 
							}
						});
						var objJson = {
								collection : "funcionarios",
								keys : [
									{
										key : "documento.matricula",
										value : usuario
									}, 
									{
										key : "documento.senha",
										value : senha
									} 
									]
							};

						$.ajax({
							type: "POST",
					        url: window.location.origin + "/dadosesocial/rest/crud/obter",
					        contentType: "application/json; charset=utf-8",
					        dataType: 'json',
					        data : JSON.stringify(objJson),
							async : "false"
						})        	
						.done(function( data ) {
							if (data){
								if (data.documento){
//									if (data.documento.mudarSenha == "sim"){
//										var token = criaToken(usuario);
//										$(window.document.location).attr('href','muda-senha.html?' + token);
//									}else{
										if (data.documento.statusFun == "finalizado"){
											var validator = $("#login-form").validate();
											 /* Build up errors object, name of input and error message: */
									        errors = { usuario: "Seus dados já foram aceitos pelo RH, obrigado." };
									        /* Show errors on the form */
									        validator.showErrors(errors); 
										}else{
											if (data.documento.perfil){
												sessionStorage.user = data.documento.perfil;
												sessionStorage.login = usuario;
												$(window.document.location).attr('href','index.html');
											}else{
												var validator = $("#login-form").validate();
												 /* Build up errors object, name of input and error message: */
										        errors = { password: "Usuario ou senha inválidos" };
										        /* Show errors on the form */
										        validator.showErrors(errors); 
										        errors = { usuario: "Usuario ou senha inválidos" };
										        /* Show errors on the form */
										        validator.showErrors(errors); 
											}
//										}
									}
								}
							}else{
								var validator = $("#login-form").validate();
								 /* Build up errors object, name of input and error message: */
						        errors = { password: "Usuario ou senha inválidos" };
						        /* Show errors on the form */
						        validator.showErrors(errors); 
						        errors = { usuario: "Usuario ou senha inválidos" };
						        /* Show errors on the form */
						        validator.showErrors(errors); 								
							}
						})
						.fail(function(data) {
							var validator = $("#login-form").validate();
							 /* Build up errors object, name of input and error message: */
					        errors = { password: "Usuario ou senha inválidos" };
					        /* Show errors on the form */
					        validator.showErrors(errors); 
					        errors = { usuario: "Usuario ou senha inválidos" };
					        /* Show errors on the form */
					        validator.showErrors(errors); 
						})
						.always(function(data) {
						});		
					},

					// Do not change code below
					errorPlacement : function(error, element) {
						error.insertAfter(element.parent());
					}
				});
			});
