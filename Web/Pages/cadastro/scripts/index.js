$(document).ready(function (){

	$('#formCadastro').validate()

	$('#btnChecaEmail').click(function(){
		verificaEmail();
	});
	//$('#txtEmail').val('guilhermecoelho2@gmail.com')
});


function verificaEmail(){
	var url = 'http://localhost:3001/checaemail/'+$('#txtEmail').val();

	$.get(url, function(data){
		console.log('quantidade: '+data[0].count);
	});
}