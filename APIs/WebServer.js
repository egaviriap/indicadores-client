var http = require('http');
var url = require('url');
var app = require("../app");

var ServicioHorasCargoCiudad = require('./ServicioHorasCargoCiudad.js');
var ServicioIndicesAnalista = require('./ServicioIndicesAnalista.js');
var ServicioIndicesAnalistas = require('./ServicioIndicesAnalistas.js');
var GoogleChartAdapter = require('./GoogleChartAdapter.js');
var ServicioIdNombreAnalista = require('./ServicioIdNombreAnalista.js');
var ServicioHorasPorAnalista = require('./ServicioHorasPorAnalista.js');
var ServicioIndiceClientes = require('./ServicioIndicesClientes.js');
var ServicioFaltaTarifaMes = require('./ServicioFaltaTarifaMes.js');
var ServicioFaltaTarifaMesGoogle = require('./ServicioFaltaTarifaMesGoogle.js');
var ServicioReporteMaxTime = require('./ServicioReporteMaxTime.js');
var ServicioUltimaFechaReporteXAnalista = require('./ServicioUltimaFechaReporteXAnalista.js');

var server2 = http.createServer(app);
server2.listen(3000);

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var mes = parsedUrl.query.mes;
    var ano = parsedUrl.query.ano;
    var analista=parsedUrl.query.analista;
    var servicio;

    if (/^\/api\/HorasCargoCiudad/.test(req.url)) {
        servicio = new ServicioHorasCargoCiudad();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/IndicesAnalista/.test(req.url)) {
        servicio = new ServicioIndicesAnalista();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/IndicesAnalistas2/.test(req.url)) {
        servicio = new ServicioIndicesAnalistas();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/IdNombreAnalista/.test(req.url)) {
        servicio = new ServicioIdNombreAnalista();
        servicio.getResults(writeDataNoGoogle());
    }
    if (/^\/api\/HorasPorAnalista/.test(req.url)) {
        servicio = new ServicioHorasPorAnalista();
        servicio.getResults(writeData(servicio), analista);
    }
    if (/^\/api\/IndicesClientes/.test(req.url)) {
        servicio = new ServicioIndiceClientes();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/FaltaTarifaMesInterno/.test(req.url)) {
        servicio = new ServicioFaltaTarifaMes();
        servicio.getResults(writeDataNoGoogle(),ano, mes);
    }
    if (/^\/api\/FaltaTarifaMes/.test(req.url)) {
        servicio = new ServicioFaltaTarifaMesGoogle();
        servicio.getResults(writeData(servicio),ano, mes);
    }
    if (/^\/api\/ReporteMaxTime/.test(req.url)) {
        servicio = new ServicioReporteMaxTime();
        servicio.getResults(writeData(servicio),ano, mes);
    }
    if (/^\/api\/ReporteUltimaFecha/.test(req.url)) {
        servicio = new ServicioUltimaFechaReporteXAnalista();
        servicio.getResults(writeData(servicio),ano, mes);
    }
    if (/^\/api\/reporteMaxTime/.test(req.url)) {
        servicio = new ServicioReporteMaxTime();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }

    if (/^\/api\/reporteUltimaFecha/.test(req.url)) {
        servicio = new ServicioUltimaFechaReporteXAnalista();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }

    function writeData(servicio){
        return function(data){
            var Charts = new GoogleChartAdapter();
            var formatedData = Charts.getFormatedData(servicio,data);
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': "*"});
            res.end(JSON.stringify(formatedData));
        }
    }

    function writeDataNoGoogle(){
        return function(data){
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': "*"});
            res.end(JSON.stringify(data));
        }
    }
    function downloadReports(servicio, query){
        return function(data){
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
                'Access-Control-Allow-Origin': "*"});
            res.end(servicio.saveDataXls(data, query));

        }
    }
});

server.listen(4000);

