var http = require('http');
var https = require('https');
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//instancia variaveis
var app = express();

//conexão db
var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "entendoDireito"
	});

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

//executa
app.listen(3001);
console.log('executando');