(function(){
  var usuarios = [{ name: 'teste', price: 2.95 }, {name: 'teste2', price: 2.65}];
  var app = angular.module('cadastroCorrespondente', []);
  var dados = {
  		existe: false,
  		novoCadastro: true
  	};

  app.controller('cadastroController', function($scope, $http){
  	this.cad = dados;

  	//verifica se ja existe o email
  	$scope.mudaStatus = function(){
    	$http.get('http://localhost:3001/checaemail/oi').
        success(function(data) {
        	debugger
        	if(data[0].count == 0){
        		dados.existe = true;
        		dados.novoCadastro = false;
        	} else {
				dados.existe = false;
        		dados.novoCadastro = true;
        	}
        });	
    }
  });

  app.controller('usuarioController', function(){
    this.users = usuarios;
  });

   app.controller('escolaridadeController', function ($scope, $window) {
        $scope.Education = [{ name: 'teste', id: 1 }, {name: 'teste2', id: 2}];
    });
   
})();

$(document).ready(function(){
	$('#btnForm').click(salvarUsuario);

	//$('#btnChecaEmail').click(checaEmail);
});

function checaEmail(){
	dados.exite = false;
}

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