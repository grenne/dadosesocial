/**
 * 
 */


function stringMatch(variable, str){
	var returnResult =  false;
	if (str) {
		var words = str.split(" ");
		for (var i = 0; i < words.length; i++) {
			var word_a = singularize(words[i]);
			var word_b = singularize(variable);
			if ( singularize(words[i]) == singularize(variable)) {
				returnResult = true;
			};
		};
	};
	return returnResult;
};

function singularize(variable) {
	return variable.toLowerCase().replace(/\s|[0-9_]|\W|[#$%^&*()]/g, "").replace("á", "a").replace("ã", "a").replace("â", "a").replace("é", "e").replace("ê", "e").replace("õ", "o").replace("ô", "o");	
};

function separaData ( data, separador) {
	
	if (data.length < 8){
		data = "0" + data;
	};
	if (data){
		return data.slice(0,2) + separador + data.slice(2,4) + separador + data.slice(4,8);
	}else{
		return null;
	};	 
};				

function separaDataMes ( data, separador, formato) {
	var result = "";
	
	if (data && formato == null){
		result =  data.slice(0,2) + separador + data.slice(2,5) + separador + data.slice(5,9);
	};
	if (data && formato == "ddmmaaaa"){
		result =  data.slice(6,8) + separador + data.slice(4,6) + separador + data.slice(0,4);
	};

	return result;
	
	 
};				

function separaConverteDataMes ( data, separador) {

	if (data){
		var mesAlfa = data.slice(2,5);
		return data.slice(0,2) + separador + converteMesNum (mesAlfa) + separador + data.slice(5,9);
	}else{
		return "Empty";
	}	 
};				

function dataMaiorHoje(data){

	var dataHoje = dataHOje();
	var dataCompara = data.slice(6, 10) + data.slice(3, 5) + data.slice(0, 2); 
	var result = false;
	if (data.length > 7){
		if (dataCompara > dataHoje){
			result = true;
		}else{
			result = false;
		};
	};
	return result;
	
};

function dataHoje(){
	
	var d = new Date();
	var dia = d.getDate();
	var mes = d.getMonth() + 1;
	var ano = d.getFullYear();
	var diaString = dia;
	var mesString = mes;
	if (dia < 10){
		diaString = "0" + dia.toString()
	};
	if (mes < 10){
		mesString = "0" + mes.toString()
	};
	var dataHoje = ano.toString() + mesString + diaString;
	return dataHoje;
	
};

function limpaData(campo){
	var campoNovo = "";
	if (campo){
    	if (campo.length){
	    	i = 0;
	    	while (i < campo.length) {
	    		if (campo.substring(i, (i + 1)) != "/" && campo.substring(i, (i + 1)) != ":" && campo.substring(i, (i + 1)) != ")" && campo.substring(i, (i + 1)) != "(" && campo.substring(i, (i + 1)) != "-"){
	    			campoNovo = campoNovo.toString() + campo.substring(i, (i + 1)).toString() 
	    		};
	    	    i++;
	    	}
    	}else{
    		campoNovo = campo;
    	}
	}else{
		campoNovo = campo;;
	};
	return campoNovo;
}

function atualizaStatus(matricula, status, naoApaga, motivo, mandaEmail) {
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
			gravaStatus(data, matricula, status,  naoApaga, motivo, mandaEmail);
		}
	})
	.fail(function(data) {
		alert ('Problemas nno acesso aos dados do funcionario, tente novamente, se persistir contate o RH');
		if (sessionStorage.user == "rh") {
			$(window.document.location).attr('href','lista-funcionarios.html');
		}else{
			$(window.document.location).attr('href','login.html');			
		};
		
	})
	.always(function(data) {

	});		
};
function gravaStatus(collection, matricula, status, naoApaga, motivo, mandaEmail) {
	
	if (naoApaga  != "true" || collection.documento.statusFun == ""){
		collection.documento.statusFun = status;
	};
	if (motivo){
		collection.documento.motivoRejeicao = motivo;	
	};
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
		if (mandaEmail){
			mandaEmail(matricula, motivo);			
		}
	})
	.fail(function(data) {
	})
	.always(function(data) {
	
	});	
	
};

function mostraOri(valorOriginal, id){
	if ($("#div_" + id).hasClass( "original" )){
		
	}else{
		$("#div_"  + id).addClass("original");
		if (valorOriginal){
			$("#div_" + id).append('<label class="control-label">Valor Original: ' + valorOriginal + '</label>');
		}else{
			$("#div_" + id).append('<label class="control-label">Valor Original: Vazio</label>');
		}
	};

}

function criaToken (matricula){
	var date = new Date();
	var time = date.getTime() +  matricula;
	var token = $.md5(time);

	var data = {
			collection : "token",
			insert : {
				documento :{
					matricula : matricula,
					token : token
				}
			}
	};
	crudIncluir(data);
	return token;

};

function acessaToken (token){
	var result = null;
	var data = crudObterOneKey("documento.token", token, "token").done(handleData).fail(error);
	return result;

};
function handleData(data /* , textStatus, jqXHR */ ) {
	return data;
};
function error(data /* , textStatus, jqXHR */ ) {
	return data;
};
function crudObterKeys(keysName, keysValue, collection){

	var keys = [];
	
	for (var i = 0; i < keysName.length; i++) {
		var key = 
			{
				key : keysName[i],
				value : keysValue
			}
		keys.push(key);
	};
	var objJson = {
			collection : collection,
			keys : [keys]
		};
	return $.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/obter",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(objJson),
		async : "false"
    });
};
function crudObterOneKey(keyName, keyValue,  collection){
	var result = null;
	var objJson = {
			collection : collection,
			keys : [
				{
					key : keyName,
					value : keyValue
				} 
				]
		};
	return $.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/obter",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(objJson),
		async : "false",
        success : function(data) {
            remote = data;
        }
    });
}
function crudIncluir(data){
	return $.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/incluir",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(data),
		async : "false"
    });
};

function crudAtualizaDoc(data, collection, keyNmame, keyValue){
	var objJsonAtu = {
			collection : collection,
			keys : [ 
				{
				key : keyName,
				value : keyValue
				} 
				],
			update : [ {
				field : "documento",
				value : data.documento
			} ]
		};
	return $.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/atualizar",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(objJsonAtu),
		async : "false"
    });
}