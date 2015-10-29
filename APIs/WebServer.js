var http = require('http');
var url = require('url');
var app = require("../app");

var ServicioDashboard = require('./ServicioDashboard.js');
var GoogleChartAdapter = require('./GoogleChartAdapter.js');
var ServicioIdNombreAnalista = require('./ServicioIdNombreAnalista.js');
var ServicioCargarClientes = require('./ServicioCargarClientes.js');
var ServicioHorasPorAnalista = require('./ServicioHorasPorAnalista.js');
var ServicioReporteDeTarifas = require('./ServicioReporteDeTarifasGoogle.js');
var ServicioReporteMaxTime = require('./ServicioReporteMaxTime.js');
var ServicioUltimaFechaReporteXAnalista = require('./ServicioUltimaFechaReporteXAnalista.js');
var loadIndicesEmpresa = require('./loadIndicesEmpresa.js');
var ServicioAnalistasPorPais = require('./serviciototalAnalistasPais.js');
var ServicioDetalleAnalistasPorCliente = require('./servicioDetalleAnalistaPorCliente.js');
var ServicioIngresosAddSC = require('./ServicioIngresosAddSC.js');
var ServicioReporteFacturacion = require('./ServicioReporteFacturacion.js');


var server2 = http.createServer(app);
server2.listen(3000);

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var mes = parsedUrl.query.mes;
    var ano = parsedUrl.query.ano;
    var cliente = parsedUrl.query.cliente;
    var analista=parsedUrl.query.analista;
    var servicio;
    // ---------servicios
    if (/^\/api\/Dashboard/.test(req.url)) {
        servicio = new ServicioDashboard();
        servicio.getResults(writeData(servicio),ano,mes);
    }
    if (/^\/api\/IdNombreAnalista/.test(req.url)) {
        servicio = new ServicioIdNombreAnalista();
        servicio.getResults(writeDataNoGoogle());
    }
    if (/^\/api\/CargarClientes/.test(req.url)) {
        servicio = new ServicioCargarClientes();
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
    if (/^\/api\/totalAnalistasPorPais/.test(req.url)) {
        servicio = new ServicioAnalistasPorPais();
        servicio.getResults(writeData(servicio), ano, mes);
    }
    if (/^\/api\/detalleAnalistasPorCliente/.test(req.url)) {
        servicio = new ServicioDetalleAnalistasPorCliente();
        servicio.getResults(writeData(servicio), ano, mes);
    }
    if (/^\/api\/ingresosAddSC/.test(req.url)) {
        servicio = new ServicioIngresosAddSC();
        servicio.getResults(writeData(servicio), ano, mes);
    }
    if (/^\/api\/ReporteFacturacion/.test(req.url)) {
        servicio = new ServicioReporteFacturacion();
        servicio.getResults(writeData(servicio), ano, mes, cliente);
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
    if (/^\/api\/downloadDashboard/.test(req.url)) {
        servicio = new ServicioDashboard();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadReporteDeTarifas/.test(req.url)) {
        servicio = new ServicioReporteDeTarifas();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadindicesEmpresa/.test(req.url)) {
        servicio = new loadIndicesEmpresa();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadtotalAnalistasPorPais/.test(req.url)) {
        servicio = new ServicioAnalistasPorPais();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloaddetalleAnalistasPorCliente/.test(req.url)) {
        servicio = new ServicioDetalleAnalistasPorCliente();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadingresosAddSC/.test(req.url)) {
        servicio = new ServicioIngresosAddSC();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/AnalistasActivos/.test(req.url)) {
        servicio = new ServicioIdNombreAnalista();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes);
    }
    if (/^\/api\/downloadReporteFacturacion/.test(req.url)) {
        servicio = new ServicioReporteFacturacion();
        servicio.getResults(downloadReports(servicio, parsedUrl.query), ano, mes, cliente);
    }


    // -----Tendencias ------
    if (/^\/api\/indicesEmpresa/.test(req.url)) {
        servicio = new loadIndicesEmpresa();
        servicio.getResults(writeData(servicio), ano, mes);
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

