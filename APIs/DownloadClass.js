/**
 * Created by egaviria on 12/06/2015.
 */

var SQLQuery =  require('./SQLQueries.js');
var json2xls = require('json2xls');
var fs = require('fs');
var path = require('path');

var DownloadClass = function(fileName){
    this.file = __dirname + fileName;

};

DownloadClass.prototype.getFile = function(jsonData, query){
    try{
        var xls = json2xls(jsonData),
            filename = this.getFilename(query);
        fs.writeFileSync(filename, xls, 'binary');
        return fs.readFileSync(filename);
    }catch(err){
        console.log(err);
    }

};

DownloadClass.prototype.getFilename = function(query){
    return this.file + "_" +
        (new Date()).getTime() + "_" +
        query.ano + "_" + query.mes + ".xlsx";
};


module.exports = DownloadClass;