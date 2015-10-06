/**
 * Created by egaviria on 30/07/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');


var ServicioReporteFacturacion = function(){
    this.cols = [
        {label:'CLIENTE', type:'string', format: null},
        {label:'ANO', type:'number', format: null},
        {label:'MES', type:'number', format: null},
        {label:'FECHA', type:'string', format: null},
        {label:'DIA', type:'number', format: null},
        {label:'ANALISTA', type:'string', format: null},
        {label:'SERVICIO', type:'string', format: null},
        {label:'CODIGO PROYECTO', type:'string', format: null},
        {label:'CODIGOSUBPROYECTO', type:'string', format: null},
        {label:'NOMBRE SUBPROYECTO', type:'string', format: null},
        {label:'ACTIVIDAD', type:'string', format: null},
        {label:'CLUSTER', type:'string', format: null},
        {label:'HORAS INVERTIDAS', type:'number', format: null},
        {label:'CAUSAL', type:'string', format: null},
        {label:'OBSERVACIONES', type:'string', format: null},
        {label:'TIPO TIEMPO', type:'string', format: null},
        {label:'HorasAdicionalesAPagar', type:'string', format: null},
        {label:'HorasAdicionalesCompensatorio', type:'string', format: null}
    ];
};

ServicioReporteFacturacion.prototype.saveDataXls = function(jsonData, query){

    var descarga = new dlClass('/../reports/ReporteFacturacion.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioReporteFacturacion.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.ReporteFacturacion, params, callback);
};


module.exports = ServicioReporteFacturacion;