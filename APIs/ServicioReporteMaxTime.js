/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var CurrencyConversion = require('./CurrencyConverter.js');
var json2xls = require('json2xls');
var fs = require('fs');

var connection = DBConnection.getConnection();

var ServicioReporteMaxTime = function(){
    this.file = '../reports/ReporteMaxTime';

    this.cols = [
        {label:'Sector', type:'string', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'Ciudad', type:'string', format: null},
        {label:'Ano', type:'number', format: null},
        {label:'Mes', type:'number', format: null},
        {label:'Dia', type:'number', format: null},
        {label:'Analista', type:'string', format: null},
        {label:'Cedula', type:'number', format: null},
        {label:'Cargo', type:'string', format: null},
        {label:'Proyecto', type:'string', format: null},
        {label:'Servicio', type:'string', format: null},
        {label:'Facturable', type:'string', format: null},
        {label:'Actividad', type:'string', format: null},
        {label:'GrupoActividad', type:'string', format: null},
        {label:'TipoHora', type:'string', format: null},
        {label:'ValorHora', type:'number', format: "currency"},
        {label:'Horas', type:'number', format: null},
        {label:'Comentario', type:'string', format: null},
        {label:'ValorTotal', type:'number', format: "currency"}

    ];
};
/*
 *  @private
 *
 */

ServicioReporteMaxTime.prototype.saveDataXls = function(jsonData){

    try{
        var xls = json2xls(jsonData);
        fs.writeFileSync(this.file, xls, 'binary');
        return fs.readFileSync(this.file);
    }catch(err){
        console.log(err);
    }

};


ServicioReporteMaxTime.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number'),
        new DBPreparedParams('sol',CurrencyConversion.PENtoCOP,'double'),
        new DBPreparedParams('dollar',CurrencyConversion.USDtoCOP,'double')
    ];
    DBConnection.prepare(SQLQuery.MaxTimeReport, params, callback);
};


module.exports = ServicioReporteMaxTime;

