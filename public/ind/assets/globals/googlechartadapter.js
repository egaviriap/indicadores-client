/**
 * Created by egaviria on 07/05/2015.
 */

var GoogleChartAdapter = {};

GoogleChartAdapter.formatPercentage = function(value){
    var num = numeral(value);
    numeral.defaultFormat('0%');
    return num.format();
};
/**
*
* @param {Object} itemData
* @param {string|number} itemData.value
* @param {string} itemData.format
*/
GoogleChartAdapter.itemDataToPercentage = function(itemData){
    itemData['f'] = this.formatPercentage(itemData['v']);
};

/**
 *
 * @param {DataTable} datatable
 * @param {Array<number>} cols
 */
GoogleChartAdapter.convertColsToPercentage = function(datatable, cols){

    var datatableJSON = JSON.parse(datatable.toJSON());
    var rows = datatableJSON['rows'];

    rows.forEach(function(rowCols){
        rowCols['c'].forEach(function(itemData, i){
            if (cols.indexOf(i) >= 0) {
                GoogleChartAdapter.itemDataToPercentage(itemData);
            }
        });
    });
    datatableJSON['rows'] = rows;
    return datatableJSON;
};


GoogleChartAdapter.formatCurrency = function(value){
    var num = numeral(value);
    numeral.defaultFormat('$0,0.00');
    return num.format();
};
/**
 *
 * @param {Object} itemData
 * @param {string|number} itemData.value
 * @param {string} itemData.format
 */
GoogleChartAdapter.itemDataToCurrency = function(itemData){
    itemData['f'] = GoogleChartAdapter.formatCurrency(itemData['v']);
};

/**
 *
 * @param {DataTable} datatable
 * @param {Array<number>} cols
 */
GoogleChartAdapter.convertColsToCurrency = function(datatable, cols){

    var datatableJSON = JSON.parse(datatable.toJSON());
    var rows = datatableJSON['rows'];

    rows.forEach(function(rowCols){
        rowCols['c'].forEach(function(itemData, i){
            if (cols.indexOf(i) >= 0) {
                GoogleChartAdapter.itemDataToCurrency(itemData);
            }
        });
    });
    datatableJSON['rows'] = rows;
    return datatableJSON;
};
