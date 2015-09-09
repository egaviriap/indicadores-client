/**
 * Created by egaviria on 31/07/2015.
 */

(function(globals, GoogleChartAdapter, Aggregation){
    document.getElementById("checkboxesCharts").style.display = "none";

    var ingresosAddSC = function(jsonData, controlsID, chartsID){

        var proxyColumns = ingresosAddSC.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = ingresosAddSC.filters;
        this.sections = {
            cliente: ingresosAddSC.cliente,
            servicio: ingresosAddSC.servicio

        };
        this.charts = {
            ingresos: {
                transform: {
                    fx: gca.convertColsToCurrency,
                    columns: [1,2]
                },
                scale: 0.5,
                columns: [
                    proxyColumns.Total
                ]

            },
            horas: {
                transform: null,
                scale: 0.5,
                columns: [
                    proxyColumns.Horas_Adicionales
                ]
            }
        };
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };

    ingresosAddSC.proxy = {
        columns: {
            Pais: {
                index:0,
                label: 'Pais'
            },
            Cliente: {
                index:1,
                label: 'Cliente'
            },
            Servicio: {
                index:2,
                label: 'Servicio'
            },
            Horas_Adicionales:{
                index: 3,
                label: 'Horas_Adicionales'
            },
            Total:{
                index: 4,
                label: 'Total'
            }
        }
    };
    ingresosAddSC.filters = {
        pais: {
            elemID: "filterPais",
            columnName: "Pais",
            allowWrite: false,
            allowMultiple: false,
            allowNone: false,
            label: "Cliente"
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
        }
    };
    ingresosAddSC.cliente = {
        column: ingresosAddSC.proxy.columns.Cliente.index,

        ingresos: {
            elemID: "chart1_div",
            chartOptions: ["BarChart","chart1_div","Suma Ingresos Adicionales Por Cliente","Cliente",
                "Cantidad","$#,###.###",400,"vertical",["#5e8043"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart2_div",
            chartOptions:["BarChart","chart2_div","Suma Horas Por Cliente",
                "Cliente","Cantidad","decimal",400,"vertical",["#5DA5DA"]],
            chartWrapper: {}
        }

    };

    ingresosAddSC.servicio = {
        column: ingresosAddSC.proxy.columns.Servicio.index,

        ingresos: {
            elemID: "chart3_div",
            chartOptions: ["BarChart","chart3_div","Suma Ingresos Adicionales Por Servicio","Servicio",
                "Cantidad","$#,###.###",400,"vertical",["#5e8043"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart4_div",
            chartOptions:["BarChart","chart4_div","Suma Horas Por Servicio",
                "Servicio","Cantidad","decimal",400,"vertical",["#5DA5DA"]],
            chartWrapper: {}
        }

    };
    ingresosAddSC.transformToClass = function(scale){
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
    ingresosAddSC.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,allowNone,label){
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
            },
            state: {'selectedValues': ['Colombia']}
        });
    };
    ingresosAddSC.createTableChart = function(){
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
    ingresosAddSC.prototype.draw = function(){
        var tableChart = ingresosAddSC.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
            dashboard._fillData(dt);
        });
        this._createDashboard(tableChart);
    };
    ingresosAddSC.prototype._fillData = function(tableChart){
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
                globals.setChartsOptions(transformedDataTable,
                    sectionObject[chart].chartWrapper, 50);
                this.sections[section][chart].chartWrapper.draw();
            }
        }
    };
    ingresosAddSC.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter];
            var currentCreatedFilter = ingresosAddSC.createFilter(filterElement.elemID,
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
    ingresosAddSC.prototype._getAgrupatedDataSum = function(dt, groupColumn, cols){
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
    ingresosAddSC.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                ingresosAddSC.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        ingresosAddSC.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        var dashboard = new ingresosAddSC(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;
    window.ingresosAddSC = ingresosAddSC;

})(window,GoogleChartAdapter,Aggregation);
