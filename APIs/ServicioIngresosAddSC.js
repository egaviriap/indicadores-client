/**
 * Created by egaviria on 30/07/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');


var ServicioIngresosAddSC = function(){
    this.cols = [
        {label:'Cliente', type:'string', format: null},
        {label:'Servicio', type:'string', format: null},
        {label:'Horas_Adicionales', type:'number', format: null},
        {label:'Total', type:'number', format: "currency"}
    ];
};

ServicioIngresosAddSC.prototype.saveDataXls = function(jsonData, query){

    var descarga = new dlClass('/../reports/IngresosAddSC.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioIngresosAddSC.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.ingresosAddSC, params, callback);
};


module.exports = ServicioIngresosAddSC;