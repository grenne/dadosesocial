/**
 * 
 */
$.datepicker.setDefaults({
     dateFormat: 'dd/mm/yy'
});
$('html').toggleClass("hidden-menu-mobile-lock");
$.root_.toggleClass("hidden-menu");
$.root_.removeClass("minified");


//
//**    carrega dados url
//
var url   = window.location.search.replace();
var parametrosDaUrl = url.split("?")[1];
var alteraDados = true;
var parametros = "";

if (sessionStorage.user){
	if (sessionStorage.user != "rh"){
		sessionStorage.user = "";
		sessionStorage.login = "";
		$(window.document.location).attr('href','login.html');
	};
}else{
	sessionStorage.user = "";
	sessionStorage.login = "";
	$(window.document.location).attr('href','login.html');
};

var objJson = {
		collection : "funcionarios",
		keys : [
			]
	};
$("#li_icone-lista").append('<a id="icone-lista" href="dadosesocial.html?' + sessionStorage.login + '" title="seus dados"><i class="fa fa-lg fa-fw fa-list-ol"></i> <span class="menu-item-parent">Seus dados</span></a>');

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
		CarregaLista (data)				
	}
})
.fail(function(data) {
})
.always(function(data) {
});		
	
function CarregaLista(data){
	for (var i = 0; i < data.length; i++) {
		montaLista(data[i], i);
	};
	var responsiveHelper_datatable_fixed_column = undefined;
	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};
	
    var otable = $('#datatable_fixed_column').DataTable({
    	//"bFilter": false,
    	//"bInfo": false,
    	//"bLengthChange": false
    	//"bAutoWidth": false,
    	//"bPaginate": false,
    	//"bStateSave": true // saves sort state using localStorage
		"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
				"t"+
				"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
		"autoWidth" : true,
		"oLanguage": {
			"sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
		},
		"preDrawCallback" : function() {
			// Initialize the responsive datatables helper once.
			if (!responsiveHelper_datatable_fixed_column) {
				responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
			}
		},
		"rowCallback" : function(nRow) {
			responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
		},
		"drawCallback" : function(oSettings) {
			responsiveHelper_datatable_fixed_column.respond();
		}		
	
    });
    	   
    // Apply the filter
    $("#datatable_fixed_column thead th input[type=text]").on( 'keyup change', function () {
    	
        otable
            .column( $(this).parent().index()+':visible' )
            .search( this.value )
            .draw();
            
    } );
    /* END COLUMN FILTER */   

};
function montaLista(data, index){
	var statusRH = data.statusRH;
	var statusFun = data.statusFun;
	var ultimaIntervencao = "";
	if (data.statusFun == "naovisualizou"){
		statusFun = "não visualizou"
	}
	if (data.ultimaIntervencao){
		ultimaIntervencao = separaDataMes ( data.ultimaIntervencao, "/", "ddmmaaaa");
	}
	var linha = 
        '<tr>' +
		'	<td><a href="dadosesocial.html?' + data.matricula + '&lista">' + data.matricula + '</a></td>' +
		'	<td>' + data.nome + '</td>' +
		'	<td>' + statusFun + '</td>' +
		'	<td>' + ultimaIntervencao + '</td>' +
		'</tr>';

	$("#listaFuncionarios").append(linha);

}
