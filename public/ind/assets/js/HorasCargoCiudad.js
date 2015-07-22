/**
 * Created by egaviria on 28/04/2015.
 */

(function(globals, GoogleChartAdapter){
    var HorasCargoCiudad = function(jsonData, controlsID, chartsID){

        var proxyColumns = HorasCargoCiudad.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = HorasCargoCiudad.filters;
        this.sections = {
            ciudad: HorasCargoCiudad.ciudad,
            servicio: HorasCargoCiudad.servicio,
            cargo: HorasCargoCiudad.cargo
        };
        this.charts = {
            ingresos: {
                transform: {
                    fx: gca.convertColsToCurrency,
                    columns: [1]
                },
                scale: 0.5,
                columns: [
                    proxyColumns.ingresosPorServicioPorCargo
                ]

            },
            horas: {
                transform: null,
                scale: 0.5,
                columns: [
                    proxyColumns.totalHorasServicioporCargo
                ]
            }
        };
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };
    HorasCargoCiudad.proxy = {
        columns: {
            cargo:{
                index: 0,
                label: 'CargoN'
            },
            servicio:{
                index: 1,
                label: 'ServicioN'
            },
            ciudadCliente: {
                index:2,
                label: 'CiudadClienteN'
            },
            totalHorasServicioporCargo: {
                index:3,
                label: 'HorasServicioCargo'
            },
            ingresosPorServicioPorCargo: {
                index:4,
                label: 'Ingresos'
            },
            promedioValorHora: {
                index:5,
                label: 'promedioValorHora'
            },
            totalHorasPorCargo: {
                index: 6,
                label: 'TotalHorasCargo'
            },
            indiceServicioCargo:{
                index:  7,
                label: 'indiceServicioCargo'
            },
            totalHorasServicioCiudad:{
                index:  8,
                label: 'TotalHorasCiudad'
            }
        }
    };
    HorasCargoCiudad.filters = {
        ciudad: {
            elemID: "filterCiudad",
            columnName: "CiudadClienteN",
            allowWrite: false,
            allowMultiple: true,
            label: "Ciudad"
        },
        servicio: {
            elemID: "filterServicio",
            columnName: "ServicioN",
            allowWrite: false,
            allowMultiple: true,
            label: "Servicio"
        },
        cargo: {
            elemID: "filterCargo",
            columnName: "CargoN",
            allowWrite: false,
            allowMultiple: true,
            label: "Cargo"
        }
    };
    HorasCargoCiudad.ciudad = {
        column: HorasCargoCiudad.proxy.columns.ciudadCliente.index,
        ingresos: {
            elemID: "chart1_div",
            chartOptions: ["BarChart","chart1_div","Total Ingresos Por Ciudad",
                "Ingresos","Ciudad","$#,###.###",400,"vertical",["#5e8043"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart2_div",
            chartOptions:["BarChart","chart2_div","Totales de Horas Por Ciudad",
                "Horas","Ciudad","decimal",400,"vertical"],
            chartWrapper: {}
        }

    };
    HorasCargoCiudad.servicio = {
        column: HorasCargoCiudad.proxy.columns.servicio.index,
        ingresos: {
            elemID: "chart3_div",
            chartOptions: ["BarChart","chart3_div","Total Ingresos Por Servicio",
                "Ingresos","Servicio","$#,###.###",400,"vertical",["#5e8043"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart4_div",
            chartOptions:["BarChart","chart4_div","Totales de Horas Por Servicio",
                "Horas","Servicio","decimal",400,"vertical"],
            chartWrapper: {}
        }
    };
    HorasCargoCiudad.cargo = {
        column: HorasCargoCiudad.proxy.columns.cargo.index,
        ingresos: {
            elemID: "chart5_div",
            chartOptions: ["BarChart","chart5_div","Total Ingresos Por Cargo",
                "Ingresos","Cargo","$#,###.###",400,"vertical",["#5e8043"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart6_div",
            chartOptions:["BarChart","chart6_div","Totales de Horas Por Cargo",
                "Horas","Cargo","decimal",400,"vertical"],
            chartWrapper: {}
        }
    };
    HorasCargoCiudad.transformToClass = function(scale){
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
    HorasCargoCiudad.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,label){
        return new google.visualization.ControlWrapper({
            'controlType': "CategoryFilter",
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'vertical',
                    'allowNone': true,
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': 'Todos',
                    'label': label}
            }
        });
    };
    HorasCargoCiudad.createTableChart = function(){
        return new google.visualization.ChartWrapper({
            chartType: 'Table',
            containerId: 'tableChart_div',
            options: {
                page: 'enable',
                pageSize: 5,
                height: "250px"
            }
        });
    };
    HorasCargoCiudad.prototype.draw = function(){
        var tableChart = HorasCargoCiudad.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
            dashboard._fillData(dt);
        });
        this._createDashboard(tableChart);
    };
    HorasCargoCiudad.prototype._fillData = function(tableChart){
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
                sectionObject[chart].chartWrapper.draw();
            }
        }
    };
    HorasCargoCiudad.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter];
            var currentCreatedFilter = HorasCargoCiudad.createFilter(filterElement.elemID,
                filterElement.columnName,filterElement.allowWrite,
                filterElement.allowMultiple, filterElement.label);
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
    HorasCargoCiudad.prototype._getAgrupatedDataSum = function(dt, groupColumn, cols){
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
    HorasCargoCiudad.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                HorasCargoCiudad.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        HorasCargoCiudad.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
        document.getElementById("checkboxesCharts").style.display = "none";
        var dashboard = new HorasCargoCiudad(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
}
    window.draw = draw;

})(window,GoogleChartAdapter);

