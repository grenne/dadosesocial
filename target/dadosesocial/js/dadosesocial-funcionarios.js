/**
 * 
 */


function atualizaCollection(collection, matricula){
	
	$("select").each(function( index ) {
		if ($(this).attr("name")){
	    	var name =  $(this).attr("name"); 
			if (name.slice(0, 3) != "ori" && name.slice(0, 10) != "dependente" ){
				var value = $("#" + name).val();
				collection.documento[name] = limpaData(value);
    		};
		};
	});
	$("input").each(function( index ) {
		if ($(this).attr("name")){
	    	var name =  $(this).attr("name"); 
	    	var id =  $(this).attr("id"); 
			if (name.slice(0, 3) != "ori" && name.slice(0, 10) != "dependente" ){
	    		if ($(this).attr("type") == "checkbox"){    				
	    			if ($("#" + id).prop("checked")){
	    				collection.documento[name] = "X";
	    			}else{
	    				collection.documento[name] = "";
	    			};
	    		}else{
    				var value = $("#" + name).val();
    				if ($(this).attr("type") != "file"){
    					if (stringMatch("anexo", $(this).attr("class"))){
        					collection.documento[name] = value;
        				}else{
        					collection.documento[name] = limpaData(value);	
        				}
    				};
				};
			};
		};
	});
	$(".radiobox").each(function( index ) {
		if ($(this).attr("name")){
	    	var name =  $(this).attr("name"); 
	    	var id =  $(this).attr("id"); 
			if (name.slice(0, 3) != "ori" && name.slice(0, 10) != "dependente" ){
    			var value = $("#" + id).val();
    			if ($("#" + id).prop("checked")){
    				collection.documento[name] = limpaData(value);
    			};
			};
		};
	});
	$("textarea").each(function( index ) {
		if ($(this).attr("name")){
	    	var 
	    	name =  $(this).attr("name");
	    	id =  $(this).attr("id");
			if (name.slice(0, 3) != "ori" && name.slice(0, 10) != "dependente" ){
    			var value = $("#" + id).val();
    			collection.documento[name] = limpaData(value);
			};
		};
	});

	collection.documento.statusFun = "atualizado";
	collection.documento.ultimaIntervencao = dataHoje();
	var objJsonDB = {
			collection : "funcionarios",
			keys : [ {
				key : "documento.matricula",
				value : matricula
			} ],
			update : [ {
				field : "documento",
				value : collection.documento
			} ]
		};

	$.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/atualizar",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(objJsonDB),
		async : "false"
	})        	
	.done(function( data ) {
		$( ".dependentereg" ).each(function( index ) {
			atualizaDependente($(this).attr('data-index'), matricula);
		});
		if (sessionStorage.user == "rh") {
			$(window.document.location).attr('href','lista-funcionarios.html');
		}else{
			alert("Alteração enviada ao RH para validação");
			sessionStorage.logout = "true"
			$(window.document.location).attr('href','login.html');
		};	
	})
	.fail(function(data) {
		console.log ("atualizou fail");		
	})
	.always(function(data) {
	});	

	
};


function acessaDados(matricula){
	var objJson = {
			collection : "funcionarios",
			keys : [
				{
					key : "documento.matricula",
					value : matricula
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
	.done(function( data) {
		if (data){
			lerOrigem(matricula, data);				
		}else{
			alert ("Funcionário invalido");
			sessionStorage.user = "";
			sessionStorage.login = "";
			$(window.document.location).attr('href','login.html');
		}
	})
	.fail(function(data) {
		alert ("Funcionário invalido");
		sessionStorage.user = "";
		sessionStorage.login = "";
		$(window.document.location).attr('href','login.html');
	})
	.always(function(data) {
	});		

};

function lerOrigem(matricula, data){
	var objJson = {
			collection : "funcionariosOrigem",
			keys : [
				{
					key : "documento.matricula",
					value : matricula
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
	.done(function( dataOri) {
		if (dataOri){
			montaTela(data, dataOri);				
		}else{
			alert ("Funcionário sem dados origem, contate o RH");
			sessionStorage.user = "";
			sessionStorage.login = "";
			$(window.document.location).attr('href','login.html');
		}
	})
	.fail(function(data) {
		alert ("Funcionário invalido");
		sessionStorage.user = "";
		sessionStorage.login = "";
		$(window.document.location).attr('href','login.html');
	})
	.always(function(data) {
	});		

};
function montaTela (data, dataOri){
	
	$("#nome").html(data.documento.nome);
	$("#matricula").html(data.documento.matricula);
	// *** carrega dados de input
	$("input").each(function( index ) {
		if ($(this).hasClass("nouse")){
			
		}else{
			var id = $(this).attr("id");
			if (data.documento[$(this).attr("id")]){
				if ($(this).attr("type") == "checkbox"){
					if (data.documento[$(this).attr("id")] == "X"){
						$(this).prop("checked", true)
						$('#div_' + id + 'Tex').removeClass("hide");
						$("#valoresOriginais").append('<input id="ori' + $(this).attr("id") + '" name="ori' + $(this).attr("id") + '" hidden ">');
						$("#ori" + $(this).attr("id")).val(dataOri.documento[$(this).attr("id")]);
						if ($("#ori" + id).val() && $("#ori" + id).val() != data.documento[$(this).attr("id")]){
							$("#div_" + id).addClass("original");
							$("#div_" + id).append('<label class="control-label">Valor Original: ' + $("#ori" + id).val() + '</label>');
						}else{
							if ($("#ori" + id).val() != data.documento[$(this).attr("id")]){
								$("#div_" + id).addClass("original");
								$("#div_" + id).append('<label class="control-label">Valor Original: Vazio');						
							};
						};
					};			
				}else{
					if (stringMatch("datepicker", $(this).attr("class"))){
						if (separaData(data.documento[$(this).attr("id")], "/")){
							$(this).val(separaData(data.documento[$(this).attr("id")], "/"));
						};
						$("#valoresOriginais").append('<input id="ori' + $(this).attr("id") + '" name="ori' + $(this).attr("id") + '" hidden ">');
						$("#ori" + $(this).attr("id")).val(dataOri.documento[$(this).attr("id")]);		
						if ($("#ori" + id).val() && $("#ori" + id).val() != data.documento[$(this).attr("id")]){
							$("#div_" + id).addClass("original");
							$("#div_" + id).append('<label class="control-label">Valor Original: ' + $("#ori" + id).val() + '</label>');
						}else{
							if ($("#ori" + id).val() != data.documento[$(this).attr("id")]){
								$("#div_" + id).addClass("original");
								$("#div_" + id).append('<label class="control-label">Valor Original: Vazio');						
							};
						};
					}else{
						$(this).val(data.documento[$(this).attr("id")]);
						$("#valoresOriginais").append('<input id="ori' + $(this).attr("id") + '" name="ori' + $(this).attr("id") + '" hidden ">');
						$("#ori" + $(this).attr("id")).val(dataOri.documento[$(this).attr("id")]);		
						if ($("#ori" + id).val() && $("#ori" + id).val() != data.documento[$(this).attr("id")]){
							$("#div_" + id).addClass("original");
							$("#div_" + id).append('<label class="control-label">Valor Original: ' + $("#ori" + id).val() + '</label>');
						}else{
							if ($("#ori" + id).val() != data.documento[$(this).attr("id")]){
								$("#div_" + id).addClass("original");
								$("#div_" + id).append('<label class="control-label">Valor Original: Vazio');
							};
						};
					};
				};
			};
		};
	});	
	// *** carrega dados de input
	$("textarea").each(function( index ) {
		var id = $(this).attr("id");
		if (data.documento[$(this).attr("id")]){
			$(this).val(data.documento[$(this).attr("id")]);
			$("#valoresOriginais").append('<input id="ori' + $(this).attr("id") + '" name="ori' + $(this).attr("id") + '" hidden ">');
			$("#ori" + $(this).attr("id")).val(dataOri.documento[$(this).attr("id")]);		
			if ($("#ori" + id).val() && $("#ori" + id).val() != data.documento[$(this).attr("id")]){
				$("#div_" + id).addClass("original");
				$("#div_" + id).append('<label class="control-label">Valor Original: ' + $("#ori" + id).val() + '</label>');
			}else{
				if ($("#ori" + id).val() != data.documento[$(this).attr("id")]){
					$("#div_" + id).addClass("original");
					$("#div_" + id).append('<label class="control-label">Valor Original: Vazio');						
				};
			};
		};
	});
	$("select").each(function( index ) {
		var id = $(this).attr("id");
		if (data.documento[$(this).attr("id")]){
			$(this).selectpicker('val', data.documento[$(this).attr("id")]);
			$("#valoresOriginais").append('<input id="ori' + $(this).attr("id") + '" name="ori' + $(this).attr("id") + '" hidden ">');
			$("#ori" + $(this).attr("id")).val(valorSelect($(this).attr("id"), dataOri.documento[$(this).attr("id")]));		
			if ($("#ori" + id).val() && dataOri.documento[$(this).attr("id")] != data.documento[$(this).attr("id")]){
				$("#div_" + id).addClass("original");
				$("#div_" + id).append('<label class="control-label">Valor Original: ' + $("#ori" + id).val() + '</label>');
			}else{
				if (dataOri.documento[$(this).attr("id")] != data.documento[$(this).attr("id")]){
					$("#div_" + id).addClass("original");
					$("#div_" + id).append('<label class="control-label">Valor Original: Vazio');						
				};
			};
		};
	});
	$(".radiobox").each(function( index ) {
		var id = $(this).attr("id");
		var name = $(this).attr("name");
		if (data.documento[$(this).attr("name")]){
			if ($(this).val() == data.documento[$(this).attr("name")]){
				$("#" + $(this).attr("id")).prop("checked", true);
			};
			$("#valoresOriginais").append('<input id="ori' + $(this).attr("name") + '" name="ori' + $(this).attr("name") + '" hidden ">');
			$("#ori" + $(this).attr("name")).val(valorRadio($(this).attr("name"), dataOri.documento[$(this).attr("name")]));		
			if (data.documento[$(this).attr("name")]  && dataOri.documento[$(this).attr("name")] != data.documento[$(this).attr("name")]){
				if ($("#div_" + name).hasClass( "original" )){
					
				}else{
					$("#div_" + name).addClass("original");
					$("#div_" + name).append('<label class="control-label">Valor Original: ' + $("#ori" + name).val() + '</label>');
				};
			}else{
				if ($("#ori" + id).val() != data.documento[$(this).attr("id")]){
					$("#div_" + id).addClass("original");
					$("#div_" + id).append('<label class="control-label">Valor Original: Vazio');						
				};
			};
		};
	});
	$(".anexoImg").each(function( index ) {
		if ($(this).attr("name")){
	    	name =  $(this).attr("name");
	    	if (data.documento[name]){
	    		carregaPhoto (data.documento[name], name)
	    	};
		};
	});
	
};
	
