/**
 * 
 */

function acessaDadosDependente(matricula){
	var objJson = {
			collection : "dependentes",
			keys : [
				{
					key : "documento.matricula",
					value : matricula
				} 
				]
		};

	$.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/lista",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(objJson),
		async : "false"
	})        	
	.done(function( data) {
		if (data){
			varreDependentes (data)				
		}
	})
	.fail(function(data) {
	})
	.always(function(data) {
	});		
};
	
function varreDependentes(data){
	for (var i = 0; i < data.length; i++) {
		montaDependentes(data[i], i);
		mostraOrigemDependentes(data[i], i);
	};	

};
function montaDependentes(data, index){
/*	var dependente = 

		'<fieldset>' +
		'<legend id="dependenteNome' + index + '" nome="dependenteNome' + index + '">Nome do dependente' +
		'	</legend>' +
		'</fieldset>' +
		'<fieldset class="dependentereg" data-index="' + index  + '">' +
		'	<div class="form-group">' +
		'		<div class="row">' +
		'			<div id="div_dependenteCpf' + index + '" class="col-sm-12 col-md-2">' +
		'				<label class="control-label">CPF</label>' +
		'				<input type="text" class="form-control cpf"  id="dependenteCpf' + index + '" name="dependenteCpf' + index + '" />' +
		'			</div>' +
		'			<div id="div_dependenteNascimento' + index + '" class="col-sm-12 col-md-2">' +
		'				<label class="control-label">Nascimento</label>' +
		'				<input id="dependenteNascimento' + index + '" type="text" name="dependenteNascimento' + index + '" placeholder="" class="datepicker date passado form-control" >' +
		'				<input id="oridependenteNascimento' + index + '" type="text" name="oridependenteNascimento' + index + '" placeholder="" class="hide" >' +
		'			</div>' +
		'			<div id="div_dependenteParentesco' + index + '" class="col-md-2 selectContainer">' +
		'				<label class="control-label">Parentesco</label>' +
		'				<select class="form-control" id="dependenteParentesco' + index + '" name="dependenteParentesco' + index + '">' +
		'					<option class="parentesco" value=""></option>' +
		'					<option class="parentesco" value="1">Cônjuge</option>' +
		'					<option class="parentesco" value="10">Cônjuge divorciado</option>' +
		'					<option class="parentesco" value="11">Pai</option>' +
		'					<option class="parentesco" value="12">Mãe</option>' +
		'					<option class="parentesco" value="13">Irmão (ã)</option>' +
		'					<option class="parentesco" value="14">Menor Tutelado</option>' +
		'					<option class="parentesco" value="15">Parceiro inserido</option>' +
		'					<option class="parentesco" value="16">Menor Sob Guarda</option>' +
		'					<option class="parentesco" value="17">Irmão/irmã</option>' +
		'					<option class="parentesco" value="18">Sogro (a)</option>' +
		'					<option class="parentesco" value="19">Neto (a)</option>' +
		'					<option class="parentesco" value="2">Filho (a)</option>' +
		'					<option class="parentesco" value="3">Responsável de educação</option>' +
		'					<option class="parentesco" value="40">Padrasto</option>' +
		'					<option class="parentesco" value="41">Madrasta</option>' +
		'					<option class="parentesco" value="42">Bisneto(a)</option>' +
		'					<option class="parentesco" value="43">Ex - tutelado (a)</option>' +
		'					<option class="parentesco" value="44">Ex - marido</option>' +
		'					<option class="parentesco" value="45">Ex - sogro (a)</option>' +
		'					<option class="parentesco" value="46">Sobrinho (a)</option>' +
		'					<option class="parentesco" value="47">Tio (a)</option>' +
		'					<option class="parentesco" value="48">Primo (a)</option>' +
		'					<option class="parentesco" value="49">Genro ou Nora</option>' +
		'					<option class="parentesco" value="5">Tutor</option>' +
		'					<option class="parentesco" value="50">Cunhado (a)</option>' +
		'					<option class="parentesco" value="51">Curatelado</option>' +
		'					<option class="parentesco" value="52">Determinação Judicial</option>' +
		'					<option class="parentesco" value="6">Enteado</option>' +
		'					<option class="parentesco" value="BR01">Pensionista</option>' +
		'					<option class="parentesco" value="BR02">Pensionista No. 2</option>' +
		'					<option class="parentesco" value="BR03">Pensionista No. 3</option>' +														
		'				</select>' +
		'				<input id="oridependenteParentesco' + index + '" type="text" name="oridependenteParentesco' + index + '" placeholder="" class="hide" >' +
		'			</div>' +
		'		</div>' +
		'		<div class="row">' +
		'			<div class="col-sm-1 col-md1"></div>' +
		'			<div class="col-sm-8 col-md-8">' +
		'				<label class="label">Inline checkboxes</label>' +
		'				<div class="inline-group">' +
		'					<label id="div_dependenteIr" class="checkbox">' +
		'						<input type="checkbox" id="dependenteIr' + index + '" name="dependenteIr' + index + '">' +
		'						<input id="oridependenteIr' + index + '" type="text" name="oridependenteIr' + index + '" placeholder="" class="hide" >' +
		'					<i></i>IR</label>' +
		'					<label id="div_dependenteSf" class="checkbox">' +
		'						<input type="checkbox" id="dependenteSf' + index + '" name="dependenteSf' + index + '">' +
		'						<input id="oridependenteSf' + index + '" type="text" name="oridependenteSf' + index + '" placeholder="" class="hide" >' +
		'					<i></i>Salário Familia</label>' +
		'					<label id="div_dependenteEst" class="checkbox">' +
		'						<input type="checkbox" id="dependenteEst' + index + '" name="dependenteEst' + index + '">' +
		'						<input id="oridependenteEst' + index + '" type="text" name="oridependenteEst' + index + '" placeholder="" class="hide" >' +
		'					<i></i>Estudante</label>' +
		'					<label id="div_dependenteDef" class="checkbox">' +
		'						<input type="checkbox" id="dependenteDef' + index + '" name="dependenteDef' + index + '">' +
		'						<input id="oridependenteDef' + index + '" type="text" name="oridependenteDef' + index + '" placeholder="" class="hide" >' +
		'					<i></i>Deficiênte Físico</label>' +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'		<div class="form-group">' +
		'			<div class="col-md-10">' +
		'				<p class="help-block">Anexe uma imagem do CPF' +
		'				<input id="dependenteAnexoCPF' + index + '" name="dependenteAnexoCPF' + index + '" type="file" class="btn btn-default">' +
		'				</p>' +
		'			</div>' +
		'		</div>' +
		'		<div class="form-group">' +
		'			<div class="col-md-10">' +
		'				<p class="help-block">Anexe o comprovante de vínculo' +
		'				<input id="dependenteAnexoVinnculo' + index + '" name="dependenteAnexoVinculo' + index + '" type="file" class="btn btn-default">' +
		'				</p>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'<ieldset>';

*/	
	$("#dependente" + index).removeClass("hide");

	setupFuntions(data.matricula);
	
	$("#dependenteNomeHtml" + index).html(data.nome);
	$("#dependenteNome" + index).val(data.nome);
	$("#dependenteCpf" + index).val(data.cpf);
	$("#dependenteNascimento" + index).val(separaData(data.nascimentoData, "/"));
	$("#dependenteParentesco" + index).selectpicker('val', data.parentesco);
	$("#dependenteAnexoCPF" + index).val(data.dependenteAnexoCPF);
	$("#dependenteAnexoVinculo" + index).val(data.dependenteAnexoVinculo);

	if (data.ir == "X"){
		$("#dependenteIr" + index).prop("checked", true)
	}
	if (data.sf == "X"){
		$("#dependenteSf" + index).prop("checked", true)
	}
	if (data.def == "X"){
		$("#dependenteDef" + index).prop("checked", true)
	}
	if (data.est == "X"){
		$("#dependenteEst" + index).prop("checked", true)
	}
	if (data.dependenteAnexoCPF){
		carregaPhoto (data.dependenteAnexoCPF, "dependenteAnexoCPF" + index)
	};
	if (data.dependenteAnexoVinculo){
		carregaPhoto (data.dependenteAnexoVinculo, "dependenteAnexoVinculo" + index)
	};
}

function mostraOrigemDependentes(data, index){
	var objJson = {
			collection : "dependentesOrigem",
			keys : [
				{
					key : "documento.matricula",
					value : data.matricula
				}, 
				{
					key : "documento.nome",
					value : data.nome
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
			mostraOrigemDependentesDB(data, dataOri.documento, index);				
		}
	})
	.fail(function(data) {
	})
	.always(function(data) {
	});		

	
};
function mostraOrigemDependentesDB(data, dataOri, index) {

	$("#oridependenteCpf" + index).val(dataOri.cpf);
	if (dataOri.cpf != data.cpf){
		mostraOri("dependenteCpf"  + index);
	};
	$("#dependenteCpf"  + index).on('change',function(){
		mostraOri("dependenteCpf"  + index);
	});

	$("#oridependenteNascimento" + index).val(dataOri.nascimentoData);
	if (dataOri.nascimentoData != data.nascimentoData){
		mostraOri("dependenteNascimento"  + index);
	};
	$("#dependenteNascimento"  + index).on('change',function(){
		mostraOri("dependenteNascimento"  + index);
	});

	$("#oridependenteParentesco" + index).val(valorSelect("dependenteParentesco"  + index, dataOri.parentesco));
	if (dataOri.parentesco != data.parentesco){
		mostraOri("dependenteParentesco"  + index);
	};
	$("#dependenteParentesco"  + index).on('change',function(){
		mostraOri("dependenteParentesco"  + index);
	});

	if (data.ir == "X"){
		$("#dependenteIr" + index).val("checked")
	}
	if (dataOri.ir != data.ir){
		mostraOri("dependenteIr"  + index);
	};
	$("#dependenteIr"  + index).on('change',function(){
		mostraOri("dependenteIr"  + index);
	});

	if (data.sf == "X"){
		$("#oridependenteSf" + index).val("checked")
	}
	if (dataOri.parentesco != data.parentesco){
		mostraOri("dependenteSf"  + index);
	};
	$("#dependenteSf"  + index).on('change',function(){
		mostraOri("dependenteSf"  + index);
	});

	if (data.def == "X"){
		$("#oridependenteDef" + index).val("checked")
	}
	if (dataOri.def != data.def){
		mostraOri("dependenteDef"  + index);
	};
	$("#dependenteDef"  + index).on('change',function(){
		mostraOri("dependenteDef"  + index);
	});

	if (data.est == "X"){
		$("#oridependenteEst" + index).prop("checked")
	}
	if (dataOri.est != data.est){
		mostraOri("dependenteEst"  + index);
	};
	$("#dependenteEst"  + index).on('change',function(){
		mostraOri("dependenteEst"  + index);
	});

}
function incluirDependente(index, matricula){
/*	var dependente = 

		'<fieldset>' +
		'<legend>' +
		'</legend>' +
		'</fieldset>' +
		'<fieldset class="dependentereg" data-index="' + index  + '" data-incluir="incluir">' +
		'	<div class="form-group">' +
		'		<div class="row">' +
		'			<div class="col-sm-12 col-md-6">' +
		'				<label class="control-label">Nome</label>' +
		'				<input type="text" class="form-control"  id="dependenteNome' + index + '" name="dependenteNome' + index + '" />' +
		'			</div>' +
		'		</div>' +
		'		<div class="row">' +
		'			<div class="col-sm-4 col-md-2">' +
		'				<label class="control-label">CPF</label>' +
		'				<input type="text" class="form-control cpf"  id="dependenteCpf' + index + '" name="dependenteCpf' + index + '" />' +
		'			</div>' +
		'			<div class="col-sm-12 col-md-2">' +
		'				<label class="control-label">Nascimento</label>' +
		'				<input id="dependenteNascimento' + index + '" type="text" name="dependenteNascimento' + index + '" placeholder="" class="datepicker date passado form-control" >' +
		'			</div>' +
		'			<div id="div_dependenteParentesco' + index + '" class="col-md-2 selectContainer">' +
		'				<label class="control-label">Parentesco</label>' +
		'				<select class="form-control" id="dependenteParentesco' + index + '" name="dependenteParentesco' + index + '">' +
		'					<option value=""></option>' +
		'					<option value="1">Cônjuge</option>' +
		'					<option value="10">Cônjuge divorciado</option>' +
		'					<option value="11">Pai</option>' +
		'					<option value="12">Mãe</option>' +
		'					<option value="13">Irmão (ã)</option>' +
		'					<option value="14">Menor Tutelado</option>' +
		'					<option value="15">Parceiro inserido</option>' +
		'					<option value="16">Menor Sob Guarda</option>' +
		'					<option value="17">Irmão/irmã</option>' +
		'					<option value="18">Sogro (a)</option>' +
		'					<option value="19">Neto (a)</option>' +
		'					<option value="2">Filho (a)</option>' +
		'					<option value="3">Responsável de educação</option>' +
		'					<option value="40">Padrasto</option>' +
		'					<option value="41">Madrasta</option>' +
		'					<option value="42">Bisneto(a)</option>' +
		'					<option value="43">Ex - tutelado (a)</option>' +
		'					<option value="44">Ex - marido</option>' +
		'					<option value="45">Ex - sogro (a)</option>' +
		'					<option value="46">Sobrinho (a)</option>' +
		'					<option value="47">Tio (a)</option>' +
		'					<option value="48">Primo (a)</option>' +
		'					<option value="49">Genro ou Nora</option>' +
		'					<option value="5">Tutor</option>' +
		'					<option value="50">Cunhado (a)</option>' +
		'					<option value="51">Curatelado</option>' +
		'					<option value="52">Determinação Judicial</option>' +
		'					<option value="6">Enteado</option>' +
		'					<option value="BR01">Pensionista</option>' +
		'					<option value="BR02">Pensionista No. 2</option>' +
		'					<option value="BR03">Pensionista No. 3</option>' +														
		'				</select>' +
		'			</div>' +
		'		</div>' +
		'		<div class="row">' +
		'			<div class="col-sm-1 col-md1"></div>' +
		'			<div class="col-sm-8 col-md-8">' +
		'				<label class="label">Inline checkboxes</label>' +
		'				<div class="inline-group">' +
		'					<label class="checkbox">' +
		'						<input type="checkbox" id="dependenteIr' + index + '" name="dependenteIr' + index + '">' +
		'					<i></i>IR</label>' +
		'					<label class="checkbox">' +
		'						<input type="checkbox" id="dependenteSf' + index + '" name="dependenteSf' + index + '">' +
		'					<i></i>Salário Familia</label>' +
		'					<label class="checkbox">' +
		'						<input type="checkbox" id="dependenteEst' + index + '" name="dependenteEst' + index + '">' +
		'					<i></i>Estudante</label>' +
		'					<label class="checkbox">' +
		'						<input type="checkbox" id="dependenteDef' + index + '" name="dependenteDef' + index + '">' +
		'					<i></i>Deficiênte Físico</label>' +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'		<div class="form-group">' +
		'			<div class="col-md-10">' +
		'				<p class="help-block">Anexe uma imagem do CPF' +
		'				<input id="dependenteAnexoCPF' + index + '" name="dependenteAnexoCPF' + index + '" type="file" class="btn btn-default">' +
		'				</p>' +
		'			</div>' +
		'		</div>' +
		'		<div class="form-group">' +
		'			<div class="col-md-10">' +
		'				<p class="help-block">Anexe o comprovante de vínculo' +
		'				<input id="dependenteAnexoVinnculo' + index + '" name="dependenteAnexoVinculo' + index + '" type="file" class="btn btn-default">' +
		'				</p>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'<ieldset>';
*/
	$("#dependente" + index).removeClass("hide");
	$("#div_dependenteNome" + index).removeClass("hide");
	$("#cancelarInclusao" + index).removeClass("hide");
	
	setupFuntions(matricula);
}

function atualizaDependente(index, matricula){
	var objJson = {
			collection : "dependentes",
			keys : [
				{
					key : "documento.matricula",
					value : matricula
				}, 
				{
					key : "documento.nome",
					value : $("#dependenteNomeHtml" + index).html()
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
			console.log("atualizou dependente:" + $("#dependenteNomeHtml" + index).html());
			atualizaDependenteDB(data, matricula, index);
		}else{
			if ($("#dependenteNome" + index).val()){
				console.log("atualizou dependente:" + $("#dependenteNome" + index).val());
				incluiDependenteDB(matricula, index);
			};
		}
	})
	.fail(function(data) {
	})
	.always(function(data) {

	});		
};
function atualizaDependenteDB(data, matricula, index) {
	
	data.documento.matricula = matricula;
	if ($("#dependenteNome" + index).val()) {
		data.documento.nome =  $("#dependenteNome" + index).val();
	}else{
		data.documento.nome =  $("#dependenteNomeHtml" + index).html();
	};
	data.documento.cpf  = $("#dependenteCpf" + index).val().replace(".", "").replace(".", "").replace(".", "").replace("-", "");
	data.documento.nascimentoData  = $("#dependenteNascimento" + index).val().replace("/", "").replace("/", "");
	data.documento.parentesco  = $("#dependenteParentesco" + index).val();
	data.documento.dependenteAnexoCPF  = $("#dependenteAnexoCPF" + index).val();
	data.documento.dependenteAnexoVinculo  = $("#dependenteAnexoVinculo" + index).val();

	if ($("#dependenteIr" + index).prop("checked")){
		data.documento.ir = "X";
	}else{
		data.documento.ir = "";
	}
	if ($("#dependenteSf" + index).prop("checked")){
		data.documento.sf = "X";
	}else{
		data.documento.sf = "";
	}
	if ($("#dependenteDef" + index).prop("checked")){
		data.documento.def = "X";
	}else{
		data.documento.def = "";
	}
	if ($("#dependenteEst" + index).prop("checked")){
		data.documento.est = "X";
	}else{
		data.documento.est = "";
	}
	var nome = $("#dependenteNomeHtml" + index).html();
	if ($("#dependente" + index).attr('data-index') != 'incluir' ){
		var objJsonAtu = {
				collection : "dependentes",
				keys : [ 
					{
					key : "documento.matricula",
					value : matricula
					}, 
					{
					key : "documento.nome",
					value : nome
					} 
					],
				update : [ {
					field : "documento",
					value : data.documento
				} ]
			};
		$.ajax({
			type: "POST",
	        url: window.location.origin + "/dadosesocial/rest/crud/atualizar",
	        contentType: "application/json; charset=utf-8",
	        dataType: 'json',
	        data : JSON.stringify(objJsonAtu),
			async : "false"
		})        	
		.done(function( data ) {
		})
		.fail(function(data) {
		})
		.always(function(data) {
		
		});
	};
};
	
function incluiDependenteDB(matricula, index){

	var data = {
			collection : "dependentes",
			insert : {
				documento :{
					matricula : matricula,
					nome : $("#dependenteNome" + index).val(),
					cpf  : $("#dependenteCpf" + index).val(),
					nascimentoData  : $("#dependenteNascimento" + index).val(),
					parentesco  : $("#dependenteParentesco" + index).val(),
					dependenteAnexoCPF : $("#dependenteAnexoCPF" + index).val(),
					dependenteAnexoVinculo : $("#dependenteAnexoVinculo" + index).val(),
					ir:"",
					sf:"",
					def:"",
					est:""
				}
			}
	};

	if ($("#dependenteIr" + index).prop("checked")){
		data.insert.documento.ir = "X";
	}
	if ($("#dependenteSf" + index).prop("checked")){
		data.insert.documento.sf = "X";
	}
	if ($("#dependenteDef" + index).prop("checked")){
		data.insert.documento.def = "X";
	}
	if ($("#dependenteEst" + index).prop("checked")){
		data.insert.documento.est = "X";
	}
	var objJsonIns = {
			collection : "dependentes",
			insert : {
				field : "documento",
				value : data.documento
			}
		};
	$.ajax({
		type: "POST",
        url: window.location.origin + "/dadosesocial/rest/crud/incluir",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data : JSON.stringify(data),
		async : "false"
	})        	
	.done(function( data ) {
	})
	.fail(function(data) {
	})
	.always(function(data) {
	
	});		
};

