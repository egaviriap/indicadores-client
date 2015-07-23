/**
 * Created by egaviria on 01/07/2015.
 */
/**
 * Created by egaviria on 29/04/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var dlClass = require('./DownloadClass.js');

var ServicioDashboard = function(){
        this.cols = [
            {label:'ClienteN', type:'string', format: null},
            {label:'ServicioN', type:'string', format: null},
            {label:'IE', type:'number', format: "percentage"},
            {label:'IOP', type:'number', format: "percentage"},
            {label:'InFac', type:'number', format: "percentage"},
            {label:'AnalistaN', type:'string', format: null},
            {label:'Cargo', type:'string', format: null},
            //{label:'Cliente', type:'number', format: null},
            //{label:'Servicio', type:'number', format: null},
            //{label:'Analista', type:'number', format: null},
            {label:'Incap', type:'number', format: null},
            {label:'Vac', type:'number', format: null},
            {label:'Comp', type:'number', format: null},
            {label:'Preventa', type:'number', format: null},
            {label:'Induccion', type:'number', format: null},
            {label:'Informacion', type:'number', format: null},
            {label:'Error', type:'number', format: null},
            {label:'ProyectoChoucair', type:'number', format: null},
            {label:'HorasFacturables', type:'number', format: null},
            {label:'HorasNoFacturables', type:'number', format: null},
            {label:'HANF', type:'number', format: null},
            {label:'HAF', type:'number', format: null},
            {label:'HASC', type:'number', format: null},
            //{label:'CargoID', type:'number', format: null},
            {label:'HorasRegistradas', type:'number', format: null},
            {label:'HorasLaborales', type:'number', format: null},
            //{label:'Ciudad', type:'number', format: null},
            {label:'CiudadN', type:'string', format: null},
            {label:'Pais', type:'string', format: null},
            {label:'Ingresos', type:'number', format: "currency"},
            {label:'NoIngresos', type:'number', format: "currency"}
    ];
};

ServicioDashboard.prototype.saveDataXls = function(jsonData, query){

    descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};

ServicioDashboard.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.Dashboard, params, callback);
};


module.exports = ServicioDashboard;

