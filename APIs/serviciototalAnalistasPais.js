/**
 * Created by egaviria on 28/08/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');


var ServiciototalAnalistasPorPais = function(){
    this.cols = [
        {label:'Fijo', type:'string', format: null},
        {label:'Analista', type:'string', format: null},
        {label:'Cedula', type:'string', format: null},
        {label:'Cargo', type:'number', format: null},
        {label:'Pais', type:'string', format: null}
    ];
};

ServiciototalAnalistasPorPais.prototype.saveDataXls = function(jsonData, query){

    var descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};

ServiciototalAnalistasPorPais.prototype.getResults = function(callback,ano,mes){
    var now = new Date();
    var dia = now.getDate();
    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('dia',dia,'number')
    ];
    DBConnection.prepare(SQLQuery.totalAnalistasPorPais, params, callback);

};

module.exports = ServiciototalAnalistasPorPais;