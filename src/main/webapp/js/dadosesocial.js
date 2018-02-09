/**
 * 
 */
$.datepicker.setDefaults({
     dateFormat: 'dd/mm/yy'
});
$('html').toggleClass("hidden-menu-mobile-lock");
$.root_.toggleClass("hidden-menu");
$.root_.removeClass("minified");

sessionStorage.sair = "";

//** inicializa flag para controlar validação recursiva
sessionStorage.revalidaContato = "true";
if (sessionStorage.user){
}else{
	sessionStorage.user = "";
	sessionStorage.login = "";
	$(window.document.location).attr('href','login.html');
}

// 
//**    carrega dados url
//
var url   = window.location.search.replace();
var parametrosDaUrl = url.split("?")[1];
var alteraDados = "true";
var parametros = "";
var matricula = "";
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
			matricula = parametros[0];
		}else{
			parametros = parametrosDaUrl;
		}
	}else{
		matricula = parametrosDaUrl;
	};
};

sessionStorage.alteraDados = alteraDados;
sessionStorage.matricula = matricula;

if (sessionStorage.user == "co"){
	if (matricula != sessionStorage.login){
		alert("url invalida se logue novamente");
		$(window.document.location).attr('href','login.html');
	};
};

setupFuntions(matricula);
acessaDados(matricula);
acessaDadosDependente(matricula);

// anexos

montaPhoto ("esocial", "a", "funcionarios", matricula, "instrucao", "anexo01");
montaPhoto ("esocial", "a", "funcionarios", matricula, "estadocivil", "anexo02");
montaPhoto ("esocial", "a", "funcionarios", matricula, "residencia", "anexo03");
montaPhoto ("esocial", "a", "funcionarios", matricula, "ctps", "anexo04");
montaPhoto ("esocial", "a", "funcionarios", matricula, "cnh", "anexo05");
montaPhoto ("esocial", "a", "funcionarios", matricula, "rg", "anexo06");
montaPhoto ("esocial", "a", "funcionarios", matricula, "titulo", "anexo07");
montaPhoto ("esocial", "a", "funcionarios", matricula, "orgaoclasse", "anexo08");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf0", "dependenteAnexoCPF0");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo0", "dependenteAnexoVinculo0");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf1", "dependenteAnexoCPF1");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo1", "dependenteAnexoVinculo1");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf2", "dependenteAnexoCPF2");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo2", "dependenteAnexoVinculo2");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf3", "dependenteAnexoCPF3");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo3", "dependenteAnexoVinculo3");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf4", "dependenteAnexoCPF4");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo4", "dependenteAnexoVinculo4");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf5", "dependenteAnexoCPF5");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo5", "dependenteAnexoVinculo5");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf6", "dependenteAnexoCPF6");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo6", "dependenteAnexoVinculo6");
montaPhoto ("esocial", "a", "dependente", matricula, "cpf7", "dependenteAnexoCPF7");
montaPhoto ("esocial", "a", "funcionarios", matricula, "vinculo7", "dependenteAnexoVinculo7");


var objJson = {
		collection : "funcionarios",
		keys : [
			{
				key : "documento.matricula",
				value : matricula
			} 
			]
	};

var collection = "";
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
		setaDadosHide(data);
	}
})
.fail(function(data) {
	alert ('1-Problemas nno acesso aos dados do funcionario, tente novamente, se persistir contate o RH');
	if (sessionStorage.user == "rh") {
		$(window.document.location).attr('href','lista-funcionarios.html');
	}else{
		$(window.document.location).attr('href','login.html');			
	};	
})
.always(function(data) {

});		

atualizaStatus(matricula, "visualizado", "true");

$('#dadosesocial')

    .bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: { 
		estadoCivil : {
			validators : {
				notEmpty : {
					message : 'Informar estado civil'
				}
			}
        },
		raca : {
			validators : {
				notEmpty : {
					message : 'Informar raça'
				}
			}
        },
		nascimentoData : {
			validators : {
				notEmpty : {
					message : 'Informar data de nascimento'
				}
			}
        },
		nascimentoUf : {
			validators : {
				notEmpty : {
					message : 'Informar local de nascimento'
				}
			}
        },
		instrucao : {
			validators : {
				notEmpty : {
						message : 'Informar instrucao'
					}
				}
        
        },
		sexo : {
			validators : {
				notEmpty : {
					message : 'Informar sexo'
				}
			}
        },
        enderecoCep : {
			validators : {
				notEmpty : {
					message : 'Informar cep'
				}
			}
        },
        enderecoBairro : {
			validators : {
				notEmpty : {
					message : 'Informar cidade'
				}
			}
        },
        enderecoCidade : {
			validators : {
				notEmpty : {
					message : 'Informar cidade'
				}
			}
        },
        enderecoLogradouro : {
			validators : {
				notEmpty : {
					message : 'Informar logradouro'
				}
			}
        },
        enderecoNumero : {
			validators : {
				notEmpty : {
					message : 'Informar numero'
				}
			}
        },
        ctpsNumero : {
			validators : {
				notEmpty : {
					message : 'Informar numero'
				}
			}
        },
        ctpsUf : {
			validators : {
				notEmpty : {
					message : 'Informar uf'
				}
			}
        },
        ctpsSerie : {
			validators : {
				notEmpty : {
					message : 'Informar série'
				}
			}
        },
        ctpsExpedicao : {
			validators : {
				notEmpty : {
					message : 'Informar data expedição'
				}
			}
        },
        rgNumero : {
			validators : {
				notEmpty : {
					message : 'Informar numero'
				}
			}
        },
        rgUf : {
			validators : {
				notEmpty : {
					message : 'Informar uf'
				}
			}
        },
        rgOrgao : {
			validators : {
				notEmpty : {
					message : 'Informar orgão expedidor'
				}
			}
        },
        rgExpedicao : {
			validators : {
				notEmpty : {
					message : 'Informar data expedição'
				}
			}
        },
        dependenteCpf0 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf1 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf2 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf3 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf4 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf5 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf6 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteCpf7 : {
			validators : {
				notEmpty : {
					message : 'Informar CPF dependente'
				}
			}
        },
        dependenteNome0 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome1 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome2 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome3 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome4 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome5 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome6 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
        },
        dependenteNome7 : {
			validators : {
				notEmpty : {
					message : 'Informar o nome do dependente'
				}
			}
	    },
		contatoPrincipal : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                        if ($("#contatoPrincipal").val() == "" && $("#contatoCelular").val() == "" &&  $("#contatoEmergencial").val() == "") {
                            return {
                                valid: false,
                                message: 'Informar ao menos um contato'
                            }
                        }else{
                        	if (sessionStorage.revalidaContato == "true"){
                        		sessionStorage.revalidaContato = "false";
								$('#dadosesocial').bootstrapValidator('revalidateField', $('#contatoEmergencial'));
	                        	$('#dadosesocial').bootstrapValidator('revalidateField', $('#contatoCelular'));
	                        	sessionStorage.revalidaContato = "true"
                        	};
                            return {
                                valid: true,
                            }                        	
                        }
                    }
                }   
			}
	    },
	    contatoCelular : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                        if ($("#contatoPrincipal").val() == "" && $("#contatoCelular").val() == "" &&  $("#contatoEmergencial").val() == "") {
                            return {
                                valid: false,
                                message: 'Informar ao menos um contato'
                            }
                        }else{
                        	if (sessionStorage.revalidaContato == "true"){
                        		sessionStorage.revalidaContato = "false"
								$('#dadosesocial').bootstrapValidator('revalidateField', $('#contatoPrincipal'));
	                        	$('#dadosesocial').bootstrapValidator('revalidateField', $('#contatoEmergencial'));
	                        	sessionStorage.revalidaContato = "true"
                        	};
                            return {
                                valid: true,
                            }                        	
                        }
                    }
                }   
			}
	    },
	    contatoEmergencial : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                        if ($("#contatoPrincipal").val() == "" && $("#contatoCelular").val() == "" &&  $("#contatoEmergencial").val() == "") {
                            return {
                                valid: false,
                                message: 'Informar ao menos um contato'
                            }
                        }else{
                        	if (sessionStorage.revalidaContato == "true"){
                        		sessionStorage.revalidaContato = "false"
								$('#dadosesocial').bootstrapValidator('revalidateField', $('#contatoPrincipal'));
	                        	$('#dadosesocial').bootstrapValidator('revalidateField', $('#contatoCelular'));
	                        	sessionStorage.revalidaContato = "true"
                        	};
                            return {
                                valid: true,
                            }                        	
                        }
                    }
                }   
			}
	    },
	    anexo01 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo01").val() == ""){
        	        		if (testaAnexo($("#anexo01").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante de seu grau de instrução'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo02 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo02").val() == ""){
        	        		if (testaAnexo($("#anexo02").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante de seu estado civil'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo03 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo03").val() == ""){
        	        		if (testaAnexo($("#anexo03").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante de seu novo endereço'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo04 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo04").val() == ""){
        	        		if (testaAnexo($("#anexo04").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar a pagina, onde está sua foto, da carteira profissional indicada'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo05 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo05").val() == ""){
        	        		if (testaAnexo($("#anexo05").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar uma imagem de sua CNH aberta'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo06 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo06").val() == ""){
        	        		if (testaAnexo($("#anexo06").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar uma ima gem de seu RG,com frente e verso'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo07 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo07").val() == ""){
        	        		if (testaAnexo($("#anexo07").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar uma imagem da frente de seu título de eleitor'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    anexo08 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo08").val() == ""){
        	        		if (testaAnexo($("#anexo08").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar uma imagem da frente da carteira de seu conselho regional'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF0 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF0").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF0").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF1 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF1").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF1").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF2 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF2").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF2").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF3 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF3").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF3").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF4 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF4").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF4").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF5 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF5").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF5").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF6 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF6").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF6").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoCPF7 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoCPF7").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoCPF7").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar o CPF do dependnete'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo0 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoVinculo0").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo0").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo1 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoVinculo1").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo1").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo2 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoVinculo2").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo2").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo3 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoVinculo3").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo3").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo4 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoVinculo4").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo4").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo5 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#dependenteAnexoVinculo5").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo5").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo6 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo01").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo6").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    },
	    dependenteAnexoVinculo7 : {
			validators : {
                callback: {
                    message: 'The password is not valid',
                    callback: function(value, validator, $field) {
                		if ($("#anexo01").val() == ""){
        	        		if (testaAnexo($("#dependenteAnexoVinculo7").attr("data-origem"))){
                                return {
                                    valid: false,
                                    message: 'Anexar um comprovante do parentesco informado'
                                }
        	        		}else{
                                return {
                                    valid: true,
                                }                        	        	        			
        	        		}
                		}else{
                            return {
                                valid: true,
                            }                        	                			
                		}
                    }
                }   
			}
	    }
    }
	})
    .on('success.form.bv', function(e) {
    	if (sessionStorage.logout != "true") {
    		var fv = $('#dadosesocial').bootstrapValidator();
        	sessionStorage.logout = "true";
        	var erro = false;
	    	if (erro){
	    		
	    	}else{
	    		var objJsonDB = {
	    				collection : "funcionarios",
	    				keys : [
	    					{
	    						key : "documento.matricula",
	    						value : sessionStorage.matricula
	    					} 
	    					]
	    			};
				$.ajax({
		    		type: "POST",
		    	    url: window.location.origin + "/dadosesocial/rest/crud/obter",
		    	    contentType: "application/json; charset=utf-8",
		    	    dataType: 'json',
		    	    data : JSON.stringify(objJsonDB),
		    		async : "false"
		    	})        	
		    	.done(function( data ) {
		    		atualizaCollection(data, sessionStorage.matricula)
		    	})
		    	.fail(function(data) {
	//    	    		alert ('2-Problemas nno acesso aos dados do funcionario, tente novamente, se persistir contate o RH');
		    		if (sessionStorage.user == "rh") {
		    			$(window.document.location).attr('href','lista-funcionarios.html');
		    		}else{
		    			$(window.document.location).attr('href','login.html');			
		    		};	
		    	})
		    	.always(function(data) {
		
		    	});		
	    	};
    	};
    });

$("#btn_enviar").off('click');
$("#btn_enviar").on('click',function(){
	sessionStorage.logout = "false"
	$('#dadosesocial').bootstrapValidator('validate');
});

$("#btn_cancelar").off('click');
$("#btn_cancelar").on('click',function(){
	if (sessionStorage.user == "rh") {
		$(window.document.location).attr('href','lista-funcionarios.html');
	}else{
		sessionStorage.user = "";
		sessionStorage.login = "";
		sessionStorage.sair = "true";
		$(window.document.location).attr('href','login.html');			
	};
});
$("#btn_finalizar").off('click');
$("#btn_finalizar").on('click',function(){
	atualizaStatus(matricula, "finalizado", "false", $("#motivoRejeicao").val());
	sessionStorage.sair = "true";
	$(window.document.location).attr('href','lista-funcionarios.html');
});
$("#btn_rejeitar").off('click');
$("#btn_rejeitar").on('click',function(){
	atualizaStatus(matricula, "rejeitado", "false", $("#motivoRejeicao").val(), mandaEmail);
	sessionStorage.sair = "true";
});
$("#incluirDependente").off('click');
$("#incluirDependente").on('click',function(){
	var indexNew = 0;
	$(".dependentereg").each(function( index ) {
		if ($(this).hasClass("hide")){
			
		}else{
			indexNew = index;	
		}
	});
	incluirDependente(indexNew + 1, matricula);
});

$("#enderecoCep").off('change');
$("#enderecoCep").on('change',function(){
	var id = $(this).attr('name');
	mostraOri(id);
	var objJson = {
			collection : "cep",
			keys : [
				{
					key : "documento.cep",
					value : $("#enderecoCep").val().replace(/^(0+)(\d)/g,"$2").replace("-","")
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
	.done(function( regcep) {
		if (regcep){
			$("#enderecoCidade").val(regcep.documento.cidade);
			$("#enderecoBairro").val(regcep.documento.bairro);
			$("#enderecoUf").selectpicker('val', regcep.documento.uf);
			$("#enderecoLogradouro").val(regcep.documento.logradouro);
			$("#tipoLogradouro").selectpicker('val', regcep.documento.tipo);
			mostraOri("enderecoCidade");
			mostraOri("enderecoBairro");
			mostraOri("enderecoUf");
			mostraOri("enderecoLogradouro");
			mostraOri("tipoLogradouro");
		}
	})
	.fail(function(data) {
	})
	.always(function(data) {
	});		
});

$(function() {
	   $('form').submit(function(event){
	       console.log ("submit");
	    });
});

function testaAnexo(origem){
	
	var result = false;
	if (origem){
		var origens = origem.split(",");
		for (var i = 0; i < origens.length; i++) {
			console.log ("data-change-" + $("#" + origens[i]).attr("data-change"));
			if ($("#" + origens[i]).attr("data-change") == "true"){
				
				result = true;
			};
		};
	};
	return result;
};

function mandaEmail(matricula, motivo){
	$.ajax({
		type: "GET",
        url: window.location.origin + "/dadosesocial/rest/funcionario/enviar-email?matricula=" + matricula + "&motivo=" + motivo,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		async : "false"
	})        	
	.done(function(data) {
		console.log ("data-" + data);
	})
	.fail(function(data) {
	})
	.always(function(data) {
	});		
	
	$(window.document.location).attr('href','lista-funcionarios.html');

}
function setaDadosHide(collection){

	if (sessionStorage.user == "rh"){
		if (sessionStorage.alteraDados == "true"){
			if (collection.documento.motivoRejeicao){
				$("#div_motivoRejeicao").removeClass("hide");
				$("#motivoRejeicao").attr('disabled','disabled');
			};
		}else{
//			$("input").attr('disabled','disabled');
//			$("radio").attr('disabled','disabled');
//			$("select").attr('disabled','disabled');
//			$("textarea").attr('disabled','disabled');
			$('#motivoRejeicao').prop("disabled", false);
//			$("#incluirDependente").hide();
//			$("#btn_enviar").hide();
			$("#btn_enviar").html("Salvar");
			$("#btn_finalizar").removeClass("hide");
			$("#btn_rejeitar").removeClass("hide");
			$("#div_motivoRejeicao").removeClass("hide");		
		}
	}else{
		$("#icone-lista").hide();
		if (collection.documento.motivoRejeicao){
			$("#div_motivoRejeicao").removeClass("hide");
			$("#motivoRejeicao").attr('disabled','disabled');
		};
	};
	
}

function setupFuntions(matricula){

	$('.passado').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd/mm/yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		yearRange: "1940:2020",
		maxDate: $.now(),
		onSelect : function(selectedDate) {
	    	var name =  $(this).attr("name"); 
			if (name.slice(0, 10) != "dependente" ){
				$(this).closest('form').bootstrapValidator('revalidateField', $(this).prop('name'));
			};
			mostraOri($(this).attr('name'));
		}
	});
	
	$('.futuro').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd/mm/yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		minDate: 0,
		onSelect : function(selectedDate) {
	    	var name =  $(this).attr("name"); 
			if (name.slice(0, 10) != "dependente" ){
				$(this).closest('form').bootstrapValidator('revalidateField', $(this).prop('name'));
			};
			mostraOri($(this).attr('name'));
		}
	});	
	
	$( ".passado" ).datepicker( "option", "maxDate", new Date() );
	$('.date').mask('00/00/0000');
	$('.cep').mask('00000-000');
	$('.numero').mask('000.000.000.000');
	$('.cpf').mask('000.000.000-00');
	$('.celular').mask('0000.0000');
	$('.celular').focusout(function(){
	    var phone, element;
	    element = $(this);
	    element.unmask();
	    phone = element.val().replace(/\D/g, '');
	    if(phone.length > 10) {
	        element.mask("(99) 99999-9999");
	    } else {
	        element.mask("(99) 9999-99999");
	    }
	}).trigger('focusout');
	$(".textDef").off('click');
	$(".textDef").on('click',function(){
		var id = $(this).attr("id");
		if ($("#" + id).prop("checked")){
			$('#div_' + id + "Tex").removeClass("hide");
		}else{
			$('#div_' + id + "Tex").addClass("hide");
			$('#' + id + "Tex").val("");
		};
	});

	$(".fieldInput").off('change');
	$(".fieldInput").on('change',function(){
		if ($(this).attr("type") == "radio"){
			$("#" + $(this).attr('name')).val($(this).val());
			mostraOri($(this).attr('name'), "radio");	
		}else{
			mostraOri($(this).attr('name'));
		};
	});

	$("select").off('hidden.bs.select');
	$("select").on('hidden.bs.select',function(){
		var id = $(this).attr('name');
		$($("#" + id)).selectpicker('render');
		mostraOri($(this).attr('name'));
	});
	
	$("textarea").off('change');
	$("textarea").on('change',function(){
		mostraOri($(this).attr('name'));
	});
	if (sessionStorage.user == "rh"){
		if (alteraDados){
		}else{
//			$("input").attr('disabled','disabled');
//			$("radio").attr('disabled','disabled');
//			$("select").attr('disabled','disabled');
//			$("textarea").attr('disabled','disabled');
//			$("#incluirDependente").hide();
			$("#textRej").removeClass("hide");
			$("#textRej").removeClass("hide");
			$("#textRej").removeClass("hide");
		}
	}else{
		$("#icone-lista").hide();
	}	
}
	function valorSelect(item, valor){
		result = "";
		$("option").each(function( index ) {
			if ($(this).attr('data-item') == item && valor == $(this).val()){
				result = $(this).html();
			};
		});
		
		if (result == ""){
			result = valor;	
		}
		return result;
	};
	
	function valorRadio(item, valor){
		result = "";
		$(".radiobox").each(function( index ) {
			if ($(this).attr('data-item') == item && valor == $(this).attr('data-value')){
				result = $(this).attr('data-result');
			};
		});
		
		if (result == ""){
			result = valor;	
		}
		return result;
	};
	
