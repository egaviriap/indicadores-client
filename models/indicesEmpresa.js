/**
 * Created by egaviria on 31/07/2015.
 */


var mongoose = require('mongoose');

module.exports = mongoose.model('indicesEmpresa',{

    Ano: Number,
    Mes: Number,
    Pais: String,
    CiudadN: String,
    ClienteN: String,
    Cargo: String,
    ServicioN: String,
    IE: Number,
    IOP: Number,
    InFac: Number,
    Ingresos: Number,
    NoIngresos: Number,
    HorasLaborales: Number,
    HorasFacturables: Number,
    HorasNoFacturables: Number,
    HorasRegistradas: Number,
    HAF: Number,
    HANF: Number,
    HASC: Number,
    Incap: Number,
    Comp: Number,
    Vac: Number,
    Induccion: Number,
    Preventa: Number,
    Informacion: Number,
    ProyectoChoucair: Number,
    Error: Number
});