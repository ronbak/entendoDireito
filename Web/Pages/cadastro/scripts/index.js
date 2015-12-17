
var cidades;

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$(document).ready(function (){


	cidades = todasCidades();

	debugger

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

	$('#txtCidade').typeahead({
  		hint: true,
  		highlight: true,
  		minLength: 1
	},
	{
  		name: 'states',
  		source: substringMatcher(cidades)
	});

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

	$.get('http://localhost:3001/populaCidades/'+nome)
	        .success(
	        	function(data) {
	        		return data;
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
