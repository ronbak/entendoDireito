(function(){
	var app = angular.module('cadastroCorrespondente', []);

  	var usuarios = [{ name: 'teste', price: 2.95 }, {name: 'teste2', price: 2.65}];
  
  	var dados = {
  		existe: false,
  		novoCadastro: true
  	};

  app.controller('cadastroController', function($scope, $http){
  	this.cad = dados;
  	$scope.cidadesEscolhidas = [];
  	$scope.listaTelefones = [];

  	//verifica se ja existe o email
  	$scope.mudaStatus = function(){
    	$http.get('http://localhost:3001/checaemail/'+$scope.txtEmail)
	        .success(
	        	function(data) {
		        	if(data[0].count == 0){
		        		dados.existe = true;
		        		dados.novoCadastro = false;
		        	} else {
						dados.existe = false;
		        		dados.novoCadastro = true;
			        }
			    }
    		)
    		.error(
    			function(data){
    				alert('erro ao conectar');
    			}
    		)
	};
	//popula dropDown de formacao
	$scope.populaEducacao = function(){
    	$http.get('http://localhost:3001/populaEducacao/')
	        .success(
	        	function(data) {
		        	$scope.education = data;
			    }
    		)
    		.error(
    			function(data){
    				alert('erro ao conectar');
    			}
    		)
	};

	//popula dropDown de estados
	$scope.populaEstados = function(){
    	$http.get('http://localhost:3001/populaEstados/')
	        .success(
	        	function(data) {
		        	$scope.estados = data;
			    }
    		)
    		.error(
    			function(data){
    				alert('erro ao conectar');
    			}
    		)
	};

	//popula dropDown de cidades
	$scope.populaCidades = function(){
		//debugger
		if($scope.ddlEstados){
			$http.get('http://localhost:3001/populaCidades/'+$scope.ddlEstados.id_State)
	        .success(
	        	function(data) {
	        		$scope.cidades = [];
		        	$scope.cidades = data;
			    }
    		)
    		.error(
    			function(data){
    				//alert('erro ao conectar');
    			}
    		)
		}
	};

	//cria lista com cidades escolhidas
	$scope.populaCidadesEscolhidas = function(){
		//debugger
		if($scope.ddlCidade && !verificaCidadeSelecionada($scope.ddlCidade)){
			$scope.cidadesEscolhidas.push($scope.ddlCidade);
		}
	}

	//exclui cidade
	$scope.excluiCidade = function(index){
		var array = $scope.cidadesEscolhidas;
		$scope.cidadesEscolhidas = [];
		for (i =0; i < array.length; i++){
			if(array[i].id_City !== index){
				$scope.cidadesEscolhidas.push(array[i]);
			}
		}
	}

	//verifica se cidade ja foi selecionada
	function verificaCidadeSelecionada (index){
		cidadeJaSelecionada = false;
		for (i =0; i < $scope.cidadesEscolhidas.length; i++){
			if($scope.cidadesEscolhidas[i].id_City  === index.id_City){
				cidadeJaSelecionada = true;
				break;
			}
		}
		return cidadeJaSelecionada;
	}


	//popula dropdown tipo telefone 
	$scope.populaTipoTelefone = function(){
		//debugger
		$http.get('http://localhost:3001/tipoTelefone/')
	    .success(
	        function(data) {
	        	$scope.tipoTelefone = data;
			}
    	)
    	.error(
    		function(data){
    			//alert('erro ao conectar');
    		}
    	)
	};

	//cria lista com telefones
	$scope.populaTelefones = function(){
		
		if($scope.txtTelefone && $scope.ddlTipoTelefone){
			populaLista = [];
			populaLista.txtTelefone = $scope.txtTelefone;
			populaLista.st_tipo = $scope.ddlTipoTelefone;
			
			$scope.listaTelefones.push(populaLista);
		}
		
	}

	//salva correspondente
	$scope.salvaCorrespondente = function(){
		console.log($scope);
	};

  });

  app.controller('usuarioController', function(){
    this.users = usuarios;
  });
   
})();

$(document).ready(function(){
    
});

function callPagSeguro(){
	var nome = $('#txtNome').val();
	var email = $('#txtEmail').val();
	$.ajax({
		url: 'http://localhost:3000/pagSeguro',
		cache: false,
		datatype: 'jsonp',
		success: function(data){
			alert('codigo: '+data.checkout.code);
		},
		error: function(data){
			alert('erro: '+data)
		}
	})
};

function salvarUsuario(){
	var n = $('#txtNome').val();
	var e = $('#txtEmail').val();
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3001/salvar',
		cache: false,
		datatype: 'jsonp',
		data: { 'nome' : n, 'email' : e },
		success: function(data){
			//alert('codigo: '+data.checkout.code);
		},
		error: function(data){
			//alert('erro: '+data)
		}
	});
}