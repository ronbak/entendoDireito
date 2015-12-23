
var cidades;


$(document).ready(function (){

	$('#txtCidade').typeahead({
		name: 'local',
		local: ['valinhos', 'vinhedo'] 
	});

	$('#formCadastro').validate()

	$('#btnChecaEmail').click(function(){
		verificaEmail();
	});

	$('#txtCpf').mask('000.000.000-00');

	populaEstados();

	$('#ddlEstadoAtuacao').change(function(){
		populaCidade($('#ddlEstadoAtuacao').val());
	});

	//$('#txtEmail').val('guilhermecoelho2@gmail.com')

});


function verificaEmail(){
	var url = 'http://localhost:3001/checaemail/'+$('#txtEmail').val();

	$.get(url, function(data){
		console.log('quantidade: '+data[0].count);
	});
}

function populaEstados(){ 

	$('#ddlEstadoAtuacao').append(new Option('Selecione', 0, true, true));

	$.get('http://localhost:3001/populaEstados/')
	        .success(
	        	function(data) {
	        		var len = data.length;
	        		for(var i = 0; i < len; i++){
	        			$('#ddlEstadoAtuacao').append(new Option(data[i].st_estado, data[i].id_estado, true, true));
	        		}
	        		$('#ddlEstadoAtuacao').val(0);
			    }
    		);
}

function populaCidade(idEstado){

	$('#ddlCidadeAtuacao').append(new Option('Selecione', 0, true, true));

	$.get('http://localhost:3001/populaCidades/'+idEstado)
	        .success(
	        	function(data) {
	        		var len = data.length;
	        		for(var i = 0; i < len; i++){
	        			$('#ddlCidadeAtuacao').append(new Option(data[i].st_cidade, data[i].id_cidade, true, true));
	        		}
	        		$('#ddlCidadeAtuacao').val(0);
			    }
    		);
}

function populaCidadesTypeahead(nome){

	$.get('http://localhost:3001/populaCidadesTypeahead/'+nome)
	        .success(
	        	function(data) {
	        		debugger
	        		return JSON.stringify(data);
			    }
    		);
}

function todasCidades(){

	$.get('http://localhost:3001/listaCidades')

	        .success(
	        	function(data) {
	        		return data;
			    }
    		);
}
