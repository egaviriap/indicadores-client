/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var CurrencyConversion = require('./CurrencyConverter.js');
var json2xls = require('../node_modules/json2xls/lib/json2xls.js');
var fs = require('fs');
var connection = DBConnection.getConnection();

var ServicioUltimaFechaReporteXAnalista = function(){
    this.file = './reports/UltimaFechaReporteXAnalista.xlsx';

    this.cols = [
        {label:'Fecha', type:'string', format: null},
        {label:'Nombre', type:'string', format: null},
        {label:'Cedula', type:'number', format: null},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'HorasRegistradas', type:'number', format: null},
        {label:'Diferencia', type:'number', format: null}
    ];
};
/*
 *  @private
 *
 */

ServicioUltimaFechaReporteXAnalista.prototype.saveDataXls = function(jsonData){
    try{
        var xls = json2xls(jsonData);
        fs.writeFileSync(this.file, xls, 'binary');
        return fs.readFileSync(this.file);
    }catch(err){
        console.log(err);
    }

};

ServicioUltimaFechaReporteXAnalista.prototype.getResults = function(callback,ano,mes){
    var params = null;
    DBConnection.prepare(SQLQuery.UltimaFechaReporteXAnalista, params, callback);
};


module.exports = ServicioUltimaFechaReporteXAnalista;

