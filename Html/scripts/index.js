$(document).ready(function(){
	$('#btnForm').click(salvarUsuario);
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