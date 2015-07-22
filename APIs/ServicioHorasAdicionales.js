/**
 * Created by egaviria on 14/07/2015.
 */
var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioHorasAdicionales = function(){

    this.cols = [
        {label:'Analista', type:'string', format: null},
        {label:'Cargo', type:'string', format: null},
        {label:'Comp', type:'number', format: null},
        {label:'HA', type:'number', format: null},
        {label:'Sueldo', type:'number', format: null}

    ];
};
/*
 *  @private
 *
 */

ServicioHorasAdicionales.prototype.saveDataXls = function(jsonData, query){

    descarga = new dlClass('/../reports/HorasAdicionales.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioHorasAdicionales.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.horasAdicionales, params, callback);
};


module.exports = ServicioHorasAdicionales;

