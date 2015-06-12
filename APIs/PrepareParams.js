/**
 * Created by egaviria on 05/05/2015.
 */




var PrepareParams = function(){
    this.params = {
        ano: null,
        mes: null,
        fechaInicio: null,
        fechaFin: null,
        analista:null
    };
};


PrepareParams.prototype.prepare = function(ano, mes){

    this.params.ano= ano;
    this.params.mes= mes;

    return this.params;

};

module.exports = PrepareParams;