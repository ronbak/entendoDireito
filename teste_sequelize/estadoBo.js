var seq = require('./connect');

var estado = seq.import(__dirname+'/'+'estado.js')

//seq.authenticate();

module.exports.procura = 
	function (uf){
		estado.findAll({where: {st_estado :uf} }).then(function(data){
		var len = data.length;
		for(var i =0; i< len; i++){
			console.log(data[i].id_estado+' - '+data[i].st_estado);
		}
	});
}

module.exports.procuraTodos = 
	function (){
		estado.findAll().then(function(data){
		var len = data.length;
		for(var i =0; i< len; i++){
			console.log(data[i].id_estado+' - '+data[i].st_estado);
		}
	});
}