var express 	= require('express');
var fs			= require('fs');
var app 		= express();
var bodyParser 	= require('body-parser');

app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/modules', express.static(__dirname + '/modules'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.post('/api/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	fs.readFile('data/login.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		var user = JSON.parse(data)[0].username;
		var pass = JSON.parse(data)[0].password;
		if(user == username && pass == password){
			res.json({success:true});
		}else{
			res.json({message:"Usuario o Contraseña invalidos."});
		}
	});
});

app.get('/api/listarFacturas', function(req, res){
	fs.readFile('data/facturas.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		res.json(JSON.parse(data));
	});
});

app.post('/api/listarDetalle', function(req, res){
	var documento_id = req.body.documento_id;
	fs.readFile('data/detalle_factura.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		var json = JSON.parse(data);
		var jsonFinal = [];
		for (var i in json) {
			if(json[i].documento_id == documento_id){
				jsonFinal.push(json[i]);
			} 
    	}
    	res.json(jsonFinal);
	});
});

app.post('/api/listarFactura', function(req, res){
	var documento_id = req.body.documento_id;
	fs.readFile('data/facturas.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		var json = JSON.parse(data);
		var jsonFinal = [];
		for (var i in json) {
			if(json[i].documento_id == documento_id){
				jsonFinal.push(json[i]);
			} 
    	}
    	res.json(jsonFinal);
	});
});

app.post('/api/nuevaFactura', function(req, res){
	var datos = req.body;
	fs.readFile('data/facturas.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		var obj = JSON.parse(data);
		obj.push(datos);
    	json = JSON.stringify(obj);

    	fs.writeFile('data/facturas.json', json, 'utf8', function(err,data){
    		if (err) res.send(err);
    		res.json(JSON.parse(json));
    	});
	});
	
});

app.post('/api/actualizarFactura', function(req, res){
	var datos = req.body;
	fs.readFile('data/facturas.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		var json = JSON.parse(data);
		for (var i in json) {
			if(json[i].documento_id == datos.documento_id){
				var deletedItem = json.splice(i,1);
			} 
    	}

		json.push(datos);
    	json = JSON.stringify(json);

    	fs.writeFile('data/facturas.json', json, 'utf8', function(err,data){
    		if (err) res.send(err);
    		res.json(JSON.parse(json));
    	});
	});
	
});

app.post('/api/eliminarFactura', function(req, res){
	var documento_id = req.body.documento_id;
	fs.readFile('data/facturas.json', 'utf8', function (err, data) {
		if (err) res.send(err);
		var json = JSON.parse(data);
		for (var i in json) {
			if(json[i].documento_id == documento_id){
				var deletedItem = json.splice(i,1);
			} 
    	}
    	json = JSON.stringify(json);
    	fs.writeFile('data/facturas.json', json, 'utf8', function(err,data){
    		if (err) res.send(err);
    		res.json(JSON.parse(json));
    	});
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});



//Inicializando json
var facturas = [
  {
    "documento_id": 0,
    "fecha": "2017-05-01",
    "folio": "1111",
    "nombre_comprador": "Juan Perez",
    "total": 3709
  },
  {
    "documento_id": 1,
    "fecha": "2017-06-01",
    "folio": "2222",
    "nombre_comprador": "Pedro Perez",
    "total": 2400
  },
  {
    "documento_id": 2,
    "fecha": "2017-07-01",
    "folio": "3333",
    "nombre_comprador": "Felipe Perez",
    "total": 5000
  }
];
var detalle_factura = [
  {
    "documento_id": 0,
    "documento_detalle_id": 0,
    "unidad_medida": "cm",
    "precio": "500",
    "cantidad": "2",
    "subtotal": "1000",
    "descripcion": "Venta"
  },
  {
    "documento_id": 1,
    "documento_detalle_id": 1,
    "unidad_medida": "cm",
    "precio": "1000",
    "cantidad": "3",
    "subtotal": "3000",
    "descripcion": "Venta"
  },
  {
    "documento_id": 1,
    "documento_detalle_id": 2,
    "unidad_medida": "cm",
    "precio": "500",
    "cantidad": "2",
    "subtotal": "1000",
    "descripcion": "Venta"
  },
  {
    "documento_id": 2,
    "documento_detalle_id": 3,
    "unidad_medida": "m",
    "precio": "79990",
    "cantidad": "1",
    "subtotal": "79990",
    "descripcion": "Venta"
  }
];
var login = [{"username":"user","nombre":"Sebastian","password":"pass"}];
fs.writeFile('data/facturas.json', JSON.stringify(facturas), 'utf8', function(err,data){
    if (err) console.log(err);
});
fs.writeFile('data/detalle_factura.json', JSON.stringify(detalle_factura), 'utf8', function(err,data){
    if (err) console.log(err);
});
fs.writeFile('data/login.json', JSON.stringify(login), 'utf8', function(err,data){
    if (err) console.log(err);
});

app.listen(8080, function() {
	console.log('Servidor corriendo en el puerto 8080');
});