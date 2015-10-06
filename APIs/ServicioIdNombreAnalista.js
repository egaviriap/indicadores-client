/**
 * Created by egaviria on 30/04/2015.
 */
var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioIdNombreAnalista = function(){

};

ServicioIdNombreAnalista.prototype.getResults = function(callback){
    var params = null;

    DBConnection.prepare(SQLQuery.IdNombreAnalistas, params, callback);
};

ServicioIdNombreAnalista.prototype.saveDataXls = function(jsonData, query){

    var descarga = new dlClass('/../reports/AnalistasActivos.xlsx');
    return descarga.getFile(jsonData, query);

};

module.exports = ServicioIdNombreAnalista;