/**
 * Created by egaviria on 14/05/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var CurrencyConversion = require('./CurrencyConverter.js');

var ServicioFaltaTarifaMesGoogle = function(){

    this.cols = [

        {label:'Cliente', type:'string', format: null},
        {label:'Servicio', type:'string', format: null},
        {label:'ValorHora', type:'number', format: "currency"},
        {label:'ValorHoraAdicional', type:'number', format: "currency"},
        {label:'Horas', type:'number', format: null}

    ];
};
/*
 *  @private
 *
 */

ServicioFaltaTarifaMesGoogle.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('sol',CurrencyConversion.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.FaltaTarifaMes, params, callback);
};


module.exports = ServicioFaltaTarifaMesGoogle;
