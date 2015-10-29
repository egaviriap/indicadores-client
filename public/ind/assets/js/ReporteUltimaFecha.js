/*
 * Created by egaviria on 07/05/2015.
 */


(function(globals, GoogleChartAdapter){
    document.getElementById("checkboxesCharts").style.display = "none";

    var ReporteUltimaFecha = function(jsonData, controlsID, chartsID){

        var proxyColumns = ReporteUltimaFecha.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = ReporteUltimaFecha.filters;
        this.sections = {

        };
        this.charts = {

        };
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };

    ReporteUltimaFecha.proxy = {
        columns: {
            fecha: {
                index:0,
                label: 'Fecha'
            },
            diasLaborales: {
                index:1,
                label: 'Dias Laborales'
            },
            diasLaborados: {
                index:2,
                label: 'Dias Laborados'
            },
            diferencia:{
                index: 3,
                label: 'Diferencia'
            },
            analista:{
                index: 4,
                label: 'Analista'
            },
            cedula:{
                index: 5,
                label: 'Cedula'
            },
            pais:{
                index: 6,
                label: 'Pais'
            },
            horasReportadas:{
                index: 7,
                label: 'Horas Reportadas'
            }

        }
    };
    ReporteUltimaFecha.filters = {
        diasLaborados: {
            elemID: "diasLaborados",
            columnName: "DiasLaborados",
            label: "Dias Laborados"
        },
        diferencia: {
            elemID: "filterDiferencia",
            columnName: "Diferencia",
            label: "Diferencia"
        },
        analista: {
            elemID: "filterAnalista",
            columnName: "Analista",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Analista"
        }
    };

    ReporteUltimaFecha.transformToClass = function(scale){
        var classname = "";
        switch(scale){
            case 0.3:
                classname = "col-sm-4";
                break;
            case 0.5:
                classname = "col-sm-6";
                break;
            case 1:
            default:
                classname = "col-sm-12";
        }
        return classname;
    };
    ReporteUltimaFecha.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,allowNone,label){
        return new google.visualization.ControlWrapper({
            'controlType': "CategoryFilter",
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'vertical',
                    'allowNone': allowNone,
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': 'Todos',
                    'label': label}
            }
        });
    };


    ReporteUltimaFecha.createRangeFilter= function(containerId, column, label){
        return filtroValor =  new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': containerId,
            'options': {
                'filterColumnLabel': column,
                'ui': {'labelStacking': 'vertical',
                    'label': label,
                    'cssClass': 'sliderClass'},
                'minValue': 0,
                'maxValue': 30
            }
        });
    };

    ReporteUltimaFecha.createTableChart = function(){
        return new google.visualization.ChartWrapper({
            chartType: 'Table',
            containerId: 'tableChart_div',
            options: {
                page: 'enable',
                pageSize: 10,
                width: "100%"
            }
        });
    };
    ReporteUltimaFecha.prototype.draw = function(){
        var tableChart = ReporteUltimaFecha.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
        });
        this._createDashboard(tableChart);
    };

    ReporteUltimaFecha.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter], currentCreatedFilter;
            if (filterElement.elemID != "filterAnalista")
                currentCreatedFilter = ReporteUltimaFecha.createRangeFilter(filterElement.elemID,
                    filterElement.columnName, filterElement.label);
            else
                currentCreatedFilter = ReporteUltimaFecha.createFilter(filterElement.elemID,
                    filterElement.columnName,filterElement.allowWrite,
                    filterElement.allowMultiple,filterElement.allowNone, filterElement.label);

            if (filtersCounter > 1){
                this.controls.bind(
                    lastCreatedFilter, currentCreatedFilter
                );
            }
            filtersCounter++;
            lastCreatedFilter = currentCreatedFilter;
        }
        this.controls.bind(lastCreatedFilter, tableChart).draw(this.data);
    };
    ReporteUltimaFecha.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                ReporteUltimaFecha.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        ReporteUltimaFecha.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        var dashboard = new ReporteUltimaFecha(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;
    window.ReporteUltimaFecha = ReporteUltimaFecha;

})(window,GoogleChartAdapter);