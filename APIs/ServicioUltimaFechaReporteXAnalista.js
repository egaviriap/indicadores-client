/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioUltimaFechaReporteXAnalista = function(){
    this.file = __dirname + '/../reports/UltimaFechaReporteXAnalista.xlsx';

    this.cols = [
        {label:'Fecha', type:'string', format: null},
        {label:'DiasLaborales', type:'number', format: null},
        {label:'DiasLaborados', type:'number', format: null},
        {label:'Diferencia', type:'number', format: null},
        {label:'Analista', type:'string', format: null},
        {label:'Cedula', type:'string', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'TotalHorasReportadas', type:'number', format: null}
    ];
};
/*
 *  @private
 *
 */

ServicioUltimaFechaReporteXAnalista.prototype.saveDataXls = function(jsonData, query){
    descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);
};



ServicioUltimaFechaReporteXAnalista.prototype.getResults = function(callback,ano,mes){
    var now = new Date();
    var date = mes+'/'+now.getDate()+'/'+ano;
    var params = [
        new DBPreparedParams('date',date,'date')
    ];
    DBConnection.prepare(SQLQuery.UltimaFechaReporteXAnalista, params, callback);
};


module.exports = ServicioUltimaFechaReporteXAnalista;

