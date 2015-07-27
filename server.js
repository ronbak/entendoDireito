var http = require('http');
var https = require('https');
var express = require('express');
var parseString = require('xml2js').parseString;
var app = express();
var cors = require('cors');

var json;

//valores fixos para passar ao pagSeguro
var currency = 'BRL';
var itemId1 = 1;
var itemQuantity1 = 1;
var itemDescription1 = 'Acesso';

//valores do host
var host = 'ws.sandbox.pagseguro.uol.com.br';
var port = 443;
var path = '/v2/checkout?';

//app.use(cors());

//app.use(function(req, res, next) {
	
 // 	res.header("Access-Control-Allow-Origin", "null");
//  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  	next();
//});


//realiza uma nova venda para o pagSeguro e retorna o codigo da venda
app.get('/pagSeguro/:email/:token/:itemAmount1', function(req, res){

	//res.header('Access-Control-Allow-Origin', '*');
  	//res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	//res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  	//res.header('Access-Control-Allow-Credentials', true);

	//monta url completa com os valores recebidos
	path += 'email='+req.params.email+'&token='+req.params.token+'&currency='+currency+'&itemId1='+itemId1+'&itemAmount1='+req.params.itemAmount1+'&itemQuantity1='+itemQuantity1+'&itemDescription1='+itemDescription1;

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

	console.info('Options prepared:');
	console.info(optionsPost);
	console.info('Do the POST call');

	// realizando o POST
	var reqPost = https.request(optionsPost, function(res){
			console.log("statusCode: ", res.statusCode);
			console.log("headers: ", res.headers);

			res.on('data', function(d) {
        		console.info('POST result:\n');
        		process.stdout.write(d);
        		console.info('\n\nPOST completed');

        		//convert xml para JSON
				var xml = d;
				parseString(xml, function (err, result) {
		    		json = result;
				});
    		});
		});
		
	// write the json data
		reqPost.write(jsonObject);
		reqPost.end();
		reqPost.on('error', function(e) {
		    console.error(e);
		});
		res.status(200).send(json);
	});


app.listen(3000);
console.log('executando');