$(document).ready(function(){
	$('#btnForm').click(callPagSeguro);
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
	});

}