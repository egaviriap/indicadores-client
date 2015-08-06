/**
 * Created by egaviria on 14/05/2015.
 */
var dbConfig = require('../db');
var mongoose = require('mongoose');
var indicesEmpresa = require('../models/indicesEmpresa');
var db = mongoose.createConnection(dbConfig.url);
var dlClass = require('./DownloadClass.js');

var loadIndicesEmpresa = function(){

    this.cols = [
        {label:'Ano', type:'number', format: null},
        {label:'Mes', type:'number', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'CiudadN', type:'string', format: null},
        {label:'ClienteN', type:'string', format: null},
        {label:'Cargo', type:'string', format: null},
        {label:'ServicioN', type:'string', format: null},
        {label:'IE', type:'number', format: "percentage"},
        {label:'IOP', type:'number', format: "percentage"},
        {label:'InFac', type:'number', format: "percentage"},
        {label:'Ingresos', type:'number', format: "currency"},
        {label:'NoIngresos', type:'number', format: "currency"},
        {label:'HorasLaborales', type:'number', format: null},
        {label:'HorasFacturables', type:'number', format: null},
        {label:'HorasNoFacturables', type:'number', format: null},
        {label:'HorasRegistradas', type:'number', format: null},
        {label:'HAF', type:'number', format: null},
        {label:'HANF', type:'number', format: null},
        {label:'HASC', type:'number', format: null},
        {label:'Incap', type:'number', format: null},
        {label:'Comp', type:'number', format: null},
        {label:'Vac', type:'number', format: null},
        {label:'Induccion', type:'number', format: null},
        {label:'Preventa', type:'number', format: null},
        {label:'Informacion', type:'number', format: null},
        {label:'ProyectoChoucair', type:'number', format: null},
        {label:'Error', type:'number', format: null}

    ];
};

loadIndicesEmpresa.prototype.saveDataXls = function(jsonData, query){

   var descarga = new dlClass('/../reports/ReportMaxTime.xlsx');
    return descarga.getFile(jsonData, query);

};
loadIndicesEmpresa.prototype.getResults = function(callback,ano,mes){

    var cursor = indicesEmpresa.find({ Ano: ano},{"_id":false,"__v":false}).lean().exec(
        function(err, data){
            callback(data);
        });
};


module.exports = loadIndicesEmpresa;
