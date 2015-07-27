/**
 * Created by egaviria on 23/07/2015.
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('Tendencia',{
    ClienteN: String,
    ServicioN: String,
    IE: Number,
    IOP: Number,
    InFac: Number,
    AnalistaN: String,
    Cargo: String,
    Cliente: Number,
    Servicio: Number,
    Analista: Number,
    Incap: Number,
    Vac: Number,
    Comp: Number,
    Preventa: Number,
    Induccion: Number,
    Informacion: Number,
    Error: Number,
    ProyectoChoucair: Number,
    HorasFacturables: Number,
    HorasNoFacturables: Number,
    HANF: Number,
    HAF: Number,
    HASC: Number,
    CargoID: Number,
    HorasRegistradas: Number,
    HorasLaborales: Number,
    Ciudad: Number,
    CiudadN: String,
    Pais: String,
    Ingresos: Number,
    NoIngresos: Number
});