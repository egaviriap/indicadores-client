
var SQLQuery =  require('./SQLQueries.js');
var DBConnection =  require('./DBConnection.js');
var DBPreparedParams = require('./DBPreparedParams');
var connection = DBConnection.getConnection();


var ServicioAnalistasPorcliente = function(){
    this.cols = [
        {label:'Fijos', type:'number', format: null},
        {label:'Menudiados', type:'number', format: null},
        {label:'Cliente', type:'string', format: null},
        {label:'Pais', type:'string', format: null},
        {label:'Cargo', type:'string', format: null}
    ];
};
ServicioAnalistasPorcliente.prototype.getResults = function(callback,ano,mes){

    var now = new Date();

    var fecha =ano+'-'+mes+'-'+now.getDate();
    var params = [
        new DBPreparedParams('Qdate',fecha,'date')
    ];
    var datos = DBConnection.prepare(SQLQuery.analistasPorCliente, params, callback);

};


module.exports = ServicioAnalistasPorcliente;