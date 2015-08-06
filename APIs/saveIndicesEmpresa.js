/**
 * Created by egaviria on 14/05/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();
var indicesEmpresa = require('../models/indicesEmpresa');

var saveIndicesEmpresa = function(){
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

saveIndicesEmpresa.prototype.getResults = function(callback,ano,mes){

    var params = [
        new DBPreparedParams('ano',ano,'number'),
        new DBPreparedParams('mes',mes,'number')
    ];
    DBConnection.prepare(SQLQuery.indicesEmpresa, params, callback);
};

saveIndicesEmpresa.prototype.saveInMongo = function(data){

    if(data.length > 0){
        var tendencia = new indicesEmpresa();
        data.forEach(function(row){
            tendencia = new indicesEmpresa({
                Ano: row.Ano,
                Mes: row.Mes,
                Pais : row.Pais,
                CiudadN : row.CiudadN,
                ClienteN : row.ClienteN,
                Cargo: row.Cargo,
                ServicioN : row.ServicioN,
                IE : row.IE,
                IOP : row.IOP,
                InFac : row.InFac,
                Ingresos : row.Ingresos,
                NoIngresos : row.NoIngresos,
                HorasLaborales : row.HorasLaborales,
                HorasFacturables : row.HorasFacturables,
                HorasNoFacturables : row.HorasNoFacturables,
                HorasRegistradas : row.HorasRegistradas,
                HAF : row.HAF,
                HANF : row.HANF,
                HASC : row.HASC,
                Incap : row.Incap,
                Comp : row.Comp,
                Vac : row.Vac,
                Induccion : row.Induccion,
                Preventa : row.Preventa,
                Informacion : row.Informacion,
                ProyectoChoucair : row.ProyectoChoucair,
                Error : row.Error
            });
            tendencia.save(function(err) {
                if (err){
                    console.log(err);
                    throw err;
                }
                return (tendencia);
            })
        });
    }
};

module.exports = saveIndicesEmpresa;
