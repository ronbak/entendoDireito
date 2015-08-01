var http = require('http');
var https = require('https');
var express = require('express');
var parseString = require('xml2js').parseString;
var cors = require('cors');
var mysql = require('mysql');

var app = express();

var json;

//valores fixos para passar ao pagSeguro
var currency = 'BRL';
var itemId1 = 1;
var itemQuantity1 = 1;
var itemDescription1 = 'Acesso';
var email = 'guilhermecoelho2@gmail.com';
var token = '3A9C56626CBD4A269B8AED7C5FEE07B7';
var itemAmount1 = '40.00';

//valores do host
var host = 'ws.sandbox.pagseguro.uol.com.br';
var port = 443;
var path = '/v2/checkout?';

//conexão db
var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "entendoDireito"
	});

conn.connect(function(err){
	if(!err) {
	    console.log("Database is connected ... \n\n");  
	} else {
	    console.log("Error connecting database ... \n\n");  
	}
});

app.use(cors());

//realiza uma nova venda para o pagSeguro
app.get('/pagSeguro', function(req, res){

	conn.query('SELECT * from usuario', function(err, rows, fields) {
		conn.end();
  		if (!err)
    		console.log('The solution is: ', rows);
  		else
    	console.log('Error while performing Query.');
  	});

	//monta url completa com os valores recebidos
	path += 'email='+email+'&token='+token+'&currency='+currency+'&itemId1='+itemId1+'&itemAmount1='+itemAmount1+'&itemQuantity1='+itemQuantity1+'&itemDescription1='+itemDescription1;

	//JSON object
	jsonObject = JSON.stringify({
		"message" : " mensagem",
		"name" : "pagSeguro chamando",
		"caption" : " testando POST",
	});

	//HEADER
	var postHeader= {
		'Content-Type' : 'application/x-www-form-urlencoded; charset=ISO-8859-1',
		'Content-Length' : Buffer.byteLength(jsonObject,'utf8')
	};

	//post options
	var optionsPost = {
		host: host,
		port: port,
		path: path,
		method: 'POST',
		headers: postHeader
	};

	//console.info('Options prepared:');
	//console.info(optionsPost);
	//console.info('Do the POST call');

	// realizando o POST
	var reqPost = https.request(optionsPost, function(res){
			//console.log("statusCode: ", res.statusCode);
			//console.log("headers: ", res.headers);

			res.on('data', function(d) {
        		console.info('POST result:\n');
        		process.stdout.write(d);
        		console.info('\n\nPOST completed');

        		//convert xml para JSON
				var xml = d;
				parseString(xml, function (err, result) {
		    		json = result;
		    		console.info('result: '+result+'\n');
		    		console.info('err: '+err+'\n');
				});
    		});
		});
		res.status(200).send(json);
	// write the json data
		reqPost.write(jsonObject);
		reqPost.end();
		reqPost.on('error', function(e) {
		    console.error(e);
		});
		
	});


app.listen(3000);
console.log('executando');