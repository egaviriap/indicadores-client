/**
 * Created by egaviria on 15/05/2015.
 */

(function(globals, GoogleChartAdapter){
    document.getElementById("checkboxesCharts").style.display = "none";

    var ReporteDeTarifas = function(jsonData, controlsID, chartsID){

        var proxyColumns = ReporteDeTarifas.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = ReporteDeTarifas.filters;
        this.sections = {
            pais: ReporteDeTarifas.pais,
            cliente: ReporteDeTarifas.cliente,
            servicio: ReporteDeTarifas.servicio

        };
        this.charts = {
            horas: {
                scale: 1,
                columns: [
                    proxyColumns.horas
                ]
            }
        };
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };

    ReporteDeTarifas.proxy = {
        columns: {
            pais: {
                index:0,
                label: 'Pais'
            },
            cliente: {
                index:1,
                label: 'Cliente'
            },
            servicio: {
                index:2,
                label: 'Servicio'
            },
            valorHora:{
                index: 3,
                label: 'ValorHora'
            },
            valorHoraAdicional:{
                index: 4,
                label: 'ValorHoraAdicional'
            },
            horas:{
                index: 5,
                label: 'Horas'
            }
        }
    };
    ReporteDeTarifas.filters = {
        pais: {
            elemID: "filterPais",
            columnName: "Pais",
            allowWrite: false,
            allowMultiple: false,
            allowNone: true,
            label: "Pais"
        },
        cliente: {
            elemID: "filterCliente",
            columnName: "Cliente",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Cliente"
        },
        servicio: {
            elemID: "filterServicio",
            columnName: "Servicio",
            allowWrite: false,
            allowMultiple: true,
            allowNone: true,
            label: "Servicio"
        },
        valorHora:{
            elemID: "filterValorHora",
            columnName: "ValorHora",
            label:  "Valor Por Hora"
        }
    };
    ReporteDeTarifas.pais = {
        column: ReporteDeTarifas.proxy.columns.pais.index,

        horas: {
            elemID:"chart1_div",
            chartOptions:["BarChart","chart1_div","Suma Horas Por Pais",
                "Pais","Cantidad","decimal",400,"horizontal",["#5DA5DA"]],
            chartWrapper: {}
        }
    };

    ReporteDeTarifas.cliente = {
        column: ReporteDeTarifas.proxy.columns.cliente.index,

        horas: {
            elemID:"chart2_div",
            chartOptions:["BarChart","chart2_div","Suma Horas Por Cliente",
                "Cliente","Cantidad","decimal",400,"horizontal",["#5DA5DA"]],
            chartWrapper: {}
        }

    };
    ReporteDeTarifas.servicio = {
        column: ReporteDeTarifas.proxy.columns.servicio.index,

        horas: {
            elemID:"chart3_div",
            chartOptions:["BarChart","chart3_div","Suma Horas Por Servicio",
                "Servicio","Cantidad","decimal",400,"horizontal",["#5DA5DA"]],
            chartWrapper: {}
        }
    };
    ReporteDeTarifas.transformToClass = function(scale){
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
    ReporteDeTarifas.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,allowNone,label){
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


    ReporteDeTarifas.createValorHoraFilter= function(containerId, column, label){
        return filtroValor =  new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': containerId,
            'options': {
                'filterColumnLabel': column,
                'ui': {'labelStacking': 'vertical',
                    'cssClass': 'sliderClass',
                    'label': label,
                    'format':{
                        'pattern': '$#,###'
                    }
                },
                'minValue': 0,
                'maxValue': 600000
            }
        });
    };

    ReporteDeTarifas.createTableChart = function(){
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
    ReporteDeTarifas.prototype.draw = function(){
        var tableChart = ReporteDeTarifas.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
            dashboard._fillData(dt);
        });
        this._createDashboard(tableChart);
    };
    ReporteDeTarifas.prototype._fillData = function(tableChart){
        var now= new Date();
        for (section in this.sections) {
            var sectionObject = this.sections[section], dataTable;
            for (chart in this.charts) {
                var chartObject = this.charts[chart],
                    transformedDataTable;
                sectionObject[chart].chartWrapper = globals.setChartWrapper.apply({},
                    sectionObject[chart].chartOptions);

                dataTable = this._getAgrupatedDataSum(tableChart,
                    [sectionObject.column], chartObject.columns);

                transformedDataTable = chartObject.transform ?
                    chartObject.transform.fx(dataTable,
                        chartObject.transform.columns) : dataTable;
                sectionObject[chart].chartWrapper.setDataTable(transformedDataTable);
                globals.setChartAnnotation(sectionObject[chart].chartWrapper,
                    chartObject.columns);
/*                globals.setChartsOptions(transformedDataTable,
                    sectionObject[chart].chartWrapper, 20);*/
                this.sections[section][chart].chartWrapper.draw();
            }
        }
    };
    ReporteDeTarifas.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter], currentCreatedFilter;
            if (filterElement.elemID === "filterValorHora")
                 currentCreatedFilter = ReporteDeTarifas.createValorHoraFilter(filterElement.elemID,
                    filterElement.columnName, filterElement.label);
            else
                 currentCreatedFilter = ReporteDeTarifas.createFilter(filterElement.elemID,
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
    ReporteDeTarifas.prototype._getAgrupatedDataSum = function(dt, groupColumn, cols){
        var agregatedData = [], groupedData;
        cols.forEach(function (column) {
            agregatedData.push({
                column: column.index,
                label: column.label,
                type: 'number',
                aggregation: google.visualization.data.sum
            });
        });
        groupedData = google.visualization.data.group(dt, groupColumn, agregatedData);
        return groupedData;
    };
    ReporteDeTarifas.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                ReporteDeTarifas.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        ReporteDeTarifas.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        var dashboard = new ReporteDeTarifas(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;
    window.ReporteDeTarifas = ReporteDeTarifas;

})(window,GoogleChartAdapter);

