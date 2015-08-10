/**
 * Created by egaviria on 30/07/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');






var ServicioDetalleAnalistasPorcliente = function(){
    this.cols = [
        {label:'Fijo', type:'string', format: null},
        {label:'Analista', type:'string', format: null},
        {label:'Cedula', type:'string', format: null},
        {label:'Cargo', type:'number', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Pais', type:'string', format: null}
    ];
};

ServicioDetalleAnalistasPorcliente.prototype.saveDataXls = function(jsonData, query){

    var descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioDetalleAnalistasPorcliente.prototype.getResults = function(callback,ano,mes){

    var now = new Date();

    var fecha =ano+'-'+mes+'-'+now.getDate();
    var params = [
        new DBPreparedParams('Qdate',fecha,'date')
    ];
    var datos = DBConnection.prepare(SQLQuery.detalleAnalistasPorCliente, params, callback);

};


module.exports = ServicioDetalleAnalistasPorcliente;