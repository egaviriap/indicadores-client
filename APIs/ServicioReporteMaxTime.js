/**
 * Created by egaviria on 29/04/2015.
 */
var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioReporteMaxTime = function(){

    this.cols = [
        {label:'UEN', type:'string', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'Ciudad', type:'string', format: null},
        {label:'Ano', type:'number', format: null},
        {label:'Mes', type:'number', format: null},
        {label:'Dia', type:'number', format: null},
        {label:'Analista', type:'string', format: null},
        {label:'Cedula', type:'number', format: null},
        {label:'Cargo', type:'string', format: null},
        {label:'Servicio', type:'string', format: null},
        {label:'Proyecto', type:'string', format: null},
        {label:'Facturable', type:'string', format: null},
        {label:'Actividad', type:'string', format: null},
        {label:'GrupoActividad', type:'string', format: null},
        {label:'Horas_Invertidas', type:'number', format: null},
        {label:'Observaciones', type:'string', format: null},
        {label:'Tipo_Tiempo', type:'string', format: null},
        {label:'Tarifa', type:'number', format: "currency"},
        {label:'ValorTotal', type:'number', format: "currency"}

    ];
};
/*
 *  @private
 *
 */

ServicioReporteMaxTime.prototype.saveDataXls = function(jsonData, query){

   var descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioReporteMaxTime.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.MaxTimeReport, params, callback);
};


module.exports = ServicioReporteMaxTime;

