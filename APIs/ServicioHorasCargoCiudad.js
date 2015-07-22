/**
 * Created by egaviria on 23/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioHorasCargoCiudad = function(){

    this.cols = [
        {label:'CargoN', type:'string', format: null},
        {label:'ServicioN', type:'string', format: null},
        {label:'CiudadClienteN', type:'string', format: null},
        {label:'TotalHorasServicioCargo', type:'number', format: null},
        {label:'IngresosServicioCargo', type:'number', format: "currency"},
        {label:'PromedioValorHora', type:'number', format: "currency"},
        {label:'TotalHorasCargo', type:'number', format: null},
        {label:'IndiceServicioCargo', type:'number', format: "percentage"},
        {label:'TotalHorasServicioCiudad', type:'number', format: null}
    ];
};

ServicioHorasCargoCiudad.prototype.saveDataXls = function(jsonData, query){

    descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioHorasCargoCiudad.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.HorasServicioCargoCiudad, params, callback);
};


module.exports = ServicioHorasCargoCiudad;