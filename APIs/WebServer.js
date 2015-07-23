var http = require('http');
var url = require('url');
var app = require("../app");

var ServicioHorasCargoCiudad = require('./ServicioHorasCargoCiudad.js');
var ServicioDashboard = require('./ServicioDashboard.js');
var GoogleChartAdapter = require('./GoogleChartAdapter.js');
var ServicioIdNombreAnalista = require('./ServicioIdNombreAnalista.js');
var ServicioHorasPorAnalista = require('./ServicioHorasPorAnalista.js');
var ServicioReporteDeTarifas = require('./ServicioReporteDeTarifasGoogle.js');
var ServicioReporteMaxTime = require('./ServicioReporteMaxTime.js');
var ServicioUltimaFechaReporteXAnalista = require('./ServicioUltimaFechaReporteXAnalista.js');
var ServicioReporteHorasAdicionales = require('./ServicioHorasAdicionales.js');
var ServicioTendencias = require('./ServicioTendencias.js');

var server2 = http.createServer(app);
server2.listen(3000);

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var mes = parsedUrl.query.mes;
    var ano = parsedUrl.query.ano;
    var analista=parsedUrl.query.analista;
    var servicio;

    if (/^\/api\/tendencias/.test(req.url)) {
        servicio = new ServicioTendencias();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/HorasCargoCiudad/.test(req.url)) {
        servicio = new ServicioHorasCargoCiudad();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/Dashboard/.test(req.url)) {
        servicio = new ServicioDashboard();
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
    if (/^\/api\/ReporteDeTarifas/.test(req.url)) {
        servicio = new ServicioReporteDeTarifas();
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
    if (/^\/api\/reporteHorasAdicionales/.test(req.url)) {
        servicio = new ServicioReporteHorasAdicionales();
        servicio.getResults(writeData(servicio, parsedUrl.query), ano, mes);
    }
    //download Reports--------

    if (/^\/api\/downloadReporteMaxTime/.test(req.url)) {
        servicio = new ServicioReporteMaxTime();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadReporteUltimaFecha/.test(req.url)) {
        servicio = new ServicioUltimaFechaReporteXAnalista();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadreporteHorasAdicionales/.test(req.url)) {
        servicio = new ServicioReporteHorasAdicionales();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadDashboard/.test(req.url)) {
        servicio = new ServicioDashboard();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadHorasCargoCiudad/.test(req.url)) {
        servicio = new ServicioHorasCargoCiudad();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadReporteDeTarifas/.test(req.url)) {
        servicio = new ServicioReporteDeTarifas();
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

