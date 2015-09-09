/**
 * Created by egaviria on 14/05/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioReporteDeTarifasGoogle = function(){

    this.cols = [

        {label:'Pais', type:'string', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Servicio', type:'string', format: null},
        {label:'ValorHora', type:'number', format: "currency"},
        {label:'ValorHoraAdicional', type:'number', format: "currency"},
        {label:'Horas', type:'number', format: null}

    ];
};

ServicioReporteDeTarifasGoogle.prototype.saveDataXls = function(jsonData, query){

    descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioReporteDeTarifasGoogle.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.ReporteDeTarifas, params, callback);
};


module.exports = ServicioReporteDeTarifasGoogle;
