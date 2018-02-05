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
        	$(".errAnexo").remove();        	
        	$(".anexo").each(function( index ) {
        		if ($("#upload-img-" + $(this).attr("name")).val() == ""){
	        		if (testaAnexo($(this).attr("data-origem"))){
	        			$("#div_anexo01").append('<label class="control-label errAnexo">' + $(this).attr("data-errMsg") + '</label>');
//	        			$("#div_" + $(this).attr("id")).append('<label class="control-label errAnexo">' + $(this).attr("data-errMsg") + '</label>');
				        $(this).focus();
				        erro = true;
	        		};
        		};
        	});
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
			$("#enderecoUf").val(regcep.documento.uf);
			$("#enderecoLogradouro").val(regcep.documento.logradouro);
			$("#tipoLogradouro").val(regcep.documento.tipo);
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
	$("#incluirDependente").off('click');
	$("#incluirDependente").on('click',function(){
		var indexNew = 0;
		$(".dependentereg").each(function( index ) {
			indexNew = index;
		});
		incluirDependente(indexNew + 1, matricula);
	});

	$(".fieldInput").off('change');
	$(".fieldInput").on('change',function(){
		mostraOri($(this).attr('name'));
	});

	$("select").off('hidden.bs.select');
	$("select").on('hidden.bs.select',function(){
		var id = $(this).attr('name');
		$($("#" + id)).selectpicker('render');
		mostraOri($(this).attr('name'));
	});
	$("radio").off('change');
	$("radio").on('change',function(){
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
		$(".radioItem").each(function( index ) {
			if ($(this).attr('data-item') == item && valor == $(this).attr('data-value')){
				result = $(this).html();
			};
		});
		
		if (result == ""){
			result = valor;	
		}
		return result;
	};
	
