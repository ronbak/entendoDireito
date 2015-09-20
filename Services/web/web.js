var http = require('http');
var https = require('https');
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');


//conexão db

//conecta com o banco
function conectaBanco(){

	var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "ned_novo"
	});

	conn.connect(function(err){
		if(!err) {
			console.log("Conectado com sucesso\n");  
		} else {
			console.log("Erro ao conectar:"+err+"\n");  
		}
	});
	return conn;
}

//instancia variaveis
var app = express();

//habilita cors
app.use(cors());

//habilita serialização headers
app.use(bodyParser.urlencoded({ extended : true }));	

//insere usuario
app.post('/salvar', function(req, res){
	console.log(JSON.stringify(req.body));
	console.log(req.body.nome);

	conn.connect(function(err){
		if(!err) {
		    console.log("Conectado com sucesso\n");  
		} else {
		    console.log("Erro ao conectar:"+err+"\n");  
		}
	});
});

//verifica se um email existe
app.get('/checaEmail/:email', function(req, res){
	var query = 'SELECT COUNT(*) AS count FROM CORRESP_usuario WHERE st_email  = "'+req.params.email+'"';
	realizaConsulta(query, res);
});

//popula educacao
app.get('/populaEducacao/', function(req, res){
	var query = 'SELECT *  FROM CORRESP_educacao';
	realizaConsulta(query, res);
});

//popula estados
app.get('/populaEstados/', function(req, res){
	var query = 'SELECT *  FROM CORRESP_estado';
	realizaConsulta(query, res);
});

//popula cidades pelo estado
app.get('/populaCidades/:uf', function(req, res){
	var dados = {uf:req.params.uf};
	var query = 'SELECT *  FROM CORRESP_cidade WHERE id_estado ='+dados.uf;
	realizaConsulta(query, res);
});

//popula tipo telefone
app.get('/tipoTelefone/', function(req, res){
	var query = 'SELECT *  FROM CORRESP_telefone_tipo';
	realizaConsulta(query, res);
});

//popula servicos realizados
app.get('/areas/Especialidades', function(req, res){
	var query = 'SELECT * FROM CORRESP_especialidade';
	realizaConsulta(query, res);
});

//executa
app.listen(3001);
console.log('executando');


function realizaConsulta(query, res){

	var conn = conectaBanco();
	console.log(query);
	conn.query(query, function(err, rows, fields) {

  		if (!err){
    		console.log('The solution is: ', rows);
    		res.send(rows);
    	}
  		else{
    		console.log('Error while performing Query.');
    		res.send(err);
  		}
  		conn.end();
  		console.log('conexão encerrada.');
  	});
}