'use strict';
 
angular
.module('Home')
.controller("HomeController", ['$http', controladorPrincipal]);

function controladorPrincipal($http){
    var vm=this;
    vm.monto = 0;
    vm.id = 0;
    vm.hideView = true;
    vm.hideNew = true;
    vm.hideUpdate = true;
    vm.hideButton = false;
    vm.hideTable = false;
    vm.title = "Facturas";

	$http.get('/api/listarFacturas').then(function(respuesta){
		vm.records = respuesta.data;
	});

	vm.btnNew = function(){
		vm.hideView = true;
		vm.hideTable = true;
		vm.hideUpdate = true;
		vm.hideButton = true;
		vm.hideNew = false;
		vm.title = "Nueva Factura";
		vm.id = 0;
		vm.fecha = "";
		vm.folio = "";
		vm.nombre = "";
		vm.monto = 0;

	}
	vm.new = function(){
		$http.post('/api/nuevaFactura', {documento_id:vm.id,fecha:vm.fecha,folio:vm.folio,nombre_comprador:vm.nombre,total:vm.monto}).then(function(respuesta){
			vm.records = respuesta.data;
			vm.hideNew = true;
			vm.hideTable = false;
			vm.hideButton = false;
			vm.title = "Factura";
		});
	}
	vm.btnUpdate = function(elementos){
		vm.hideView = true;
		vm.hideTable = true;
		vm.hideNew = true;
		vm.hideButton = true;
		vm.hideUpdate = false;
		vm.title = "Modificar Factura";
		$http.post('/api/listarFactura', {documento_id:elementos.documento_id}).then(function(respuesta){
			vm.id = respuesta.data[0].documento_id;
			vm.fecha = respuesta.data[0].fecha;
			vm.folio = respuesta.data[0].folio;
			vm.nombre = respuesta.data[0].nombre_comprador;
			vm.monto = respuesta.data[0].total;
		});
	}
	vm.update = function(elementos){
		$http.post('/api/actualizarFactura', {documento_id:vm.id,fecha:vm.fecha,folio:vm.folio,nombre_comprador:vm.nombre,total:vm.monto}).then(function(respuesta){
			vm.records = respuesta.data;
			vm.hideUpdate = true;
			vm.hideTable = false;
			vm.hideButton = false;
			vm.title = "Factura";
		});
	}
	vm.delete = function(elementos){
		$http.post('/api/eliminarFactura', {documento_id:elementos.documento_id}).then(function(respuesta){
			vm.records = respuesta.data;
		});
		vm.title = "Facturas";
		vm.hideNew = true;
		vm.hideTable = false;
	}
	vm.view = function(elementos){
		vm.hideNew = true;
		vm.hideView = false;
		$http.post('/api/listarDetalle', {documento_id:elementos.documento_id}).then(function(respuesta){
			vm.details = respuesta.data;
			console.log(respuesta.data);

		});
	}
}