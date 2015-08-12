/**
 * Created by egaviria on 31/07/2015.
 */


/**
 * Created by egaviria on 28/04/2015.
 */

(function(globals, GoogleChartAdapter, Aggregation){
    document.getElementById("mesLI").style.display = "none";
    document.getElementById("checkboxesCharts").style.display = "none";

    var IndicesEmpresa = function(jsonData, controlsID, chartsID){

        var proxyColumns = IndicesEmpresa.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = IndicesEmpresa.filters;
        this.sections = {
            mes: IndicesEmpresa.mes
        };
        this.charts = {
            indices: {
                transform: {
                    fx: gca.convertColsToPercentage,
                    columns: [1,2,3]
                },
                scale: 1,
                dynamicAggregation: true,
                columns: [
                    proxyColumns.IE,
                    proxyColumns.IOP,
                    proxyColumns.InFac
                ]
            },
            ingresos: {
                transform: {
                    fx: gca.convertColsToCurrency,
                    columns: [1,2]
                },
                scale: 1,
                columns: [
                    proxyColumns.Ingresos,
                    proxyColumns.NoIngresos
                ]

            },
            horas: {
                transform: null,
                scale: 1,
                columns: [
                    proxyColumns.HorasLaborales,
                    proxyColumns.HorasFacturables,
                    proxyColumns.HorasNoFacturables
                ]
            },
            horasAdd: {
                transform: null,
                scale: 1,
                columns: [
                    proxyColumns.HANF,
                    proxyColumns.HAF,
                    proxyColumns.HASC
                ]
            },
            noFacturables: {
                transform: null,
                scale: 1,
                columns: [
                    proxyColumns.Incap,
                    proxyColumns.Comp,
                    proxyColumns.Vac,
                    proxyColumns.Induccion,
                    proxyColumns.Preventa,
                    proxyColumns.Informacion,
                    proxyColumns.ProyectoChoucair,
                    proxyColumns.GS_Coordinadores,
                    proxyColumns.Error
                ]
            }
        };
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };

    IndicesEmpresa.proxy = {
        columns: {
            Ano:{
                index: 0,
                label: 'Ano'
            },
            Mes:{
                index: 1,
                label: 'Mes'
            },
            Pais: {
                index:2,
                label: 'Pais'
            },
            CiudadN: {
                index:3,
                label: 'CiudadN'
            },
            ClienteN: {
                index:4,
                label: 'ClienteN'
            },
            Cargo: {
                index:5,
                label: 'Cargo'
            },
            ServicioN: {
                index:6,
                label: 'ServicioN'
            },
            IE:{
                index: 7,
                label: 'IE',
                dependency: {
                    static: function(){
                        return [IndicesEmpresa.proxy.columns.HorasFacturables.index];
                    },
                    dynamic:[
                        {
                            dependency: {
                                static: function(){
                                    return [IndicesEmpresa.proxy.columns.HorasLaborales.index];
                                },
                                dynamic: []
                            },
                            aggregationFn: function(horasLaborales){
                                return horasLaborales;
                            }
                        }
                    ]
                },
                aggregationFn: function(horasFacturables, horasLaborales){
                    return horasFacturables/horasLaborales;
                }
            },
            IOP: {
                index: 8,
                label: 'IOP',
                dependency: {
                    static: function(){
                        return [IndicesEmpresa.proxy.columns.HorasFacturables.index,
                            IndicesEmpresa.proxy.columns.HAF.index,
                            IndicesEmpresa.proxy.columns.HASC.index];
                    },
                    dynamic:[
                        {
                            dependency: {
                                static: function(){
                                    return [IndicesEmpresa.proxy.columns.HorasLaborales.index];
                                },
                                dynamic: []
                            },
                            aggregationFn: function(horasLaborales){
                                return horasLaborales;
                            }
                        }
                    ]
                },
                aggregationFn: function(horasFacturables, haf, hasc, horasLaborales){
                    return (horasFacturables-haf-hasc)/horasLaborales;
                }
            },
            InFac:{
                index: 9,
                label: 'InFac',
                dependency: {
                    static: function(){
                        return [IndicesEmpresa.proxy.columns.HorasFacturables.index,
                            IndicesEmpresa.proxy.columns.Incap.index,
                            IndicesEmpresa.proxy.columns.Vac.index];
                    },
                    dynamic:[
                        {
                            dependency: {
                                static: function(){
                                    return [IndicesEmpresa.proxy.columns.HorasLaborales.index];
                                },
                                dynamic: []
                            },
                            aggregationFn: function(horasLaborales){
                                return horasLaborales;
                            }
                        }
                    ]
                },
                aggregationFn: function(horasFacturables, incap, vac, horasLaborales){
                    return horasFacturables/(horasLaborales-incap-vac);
                }
            },
            Ingresos:{
                index:  10,
                label: 'Ingresos'
            },
            NoIngresos:{
                index:  11,
                label: 'NoIngresos'
            },
            HorasLaborales:{
                index:  12,
                label: 'HorasLaborales'
            },
            HorasFacturables:{
                index:  13,
                label: 'HorasFacturables'
            },
            HorasNoFacturables:{
                index:  14,
                label: 'HorasNoFacturables'
            },
            HorasRegistradas:{
                index:  15,
                label: 'HorasRegistradas'
            },
            HAF:{
                index:  16,
                label: 'HAF'
            },
            HANF:{
                index:  17,
                label: 'HANF'
            },
            HASC:{
                index:  18,
                label: 'HASC'
            },
            Incap:{
                index:  19,
                label: 'Incap'
            },
            Comp:{
                index:  20,
                label: 'Comp'
            },
            Vac:{
                index:  21,
                label: 'Vac'
            },
            Induccion:{
                index:  22,
                label: 'Induccion'
            },
            Preventa:{
                index:  23,
                label: 'Preventa'
            },
            Informacion:{
                index:  24,
                label: 'Informacion'
            },
            ProyectoChoucair:{
                index:  25,
                label: 'ProyectoChoucair'
            },
            GS_Coordinadores:{
                index:  26,
                label: 'GS_Coordinadores_Arquitectos'
            },
            Error:{
                index:  27,
                label: 'Error'
            }
        }
    };
    IndicesEmpresa.filters = {
        pais: {
            elemID: "filterPais",
            columnName: "Pais",
            allowWrite: false,
            allowMultiple: false,
            allowNone: false,
            label: "Pais"
        },
        ciudad: {
            elemID: "filterCiudad",
            columnName: "CiudadN",
            allowWrite: false,
            allowMultiple: false,
            allowNone: true,
            label: "Ciudad"
        },
        cliente: {
            elemID: "filterCliente",
            columnName: "ClienteN",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Cliente"
        },
        servicio: {
            elemID: "filterServicio",
            columnName: "ServicioN",
            allowWrite: false,
            allowMultiple: true,
            allowNone: true,
            label: "Servicio"
        },
        cargo: {
            elemID: "filterCargo",
            columnName: "Cargo",
            allowWrite: false,
            allowMultiple: true,
            allowNone: true,
            label: "Cargo"
        }
    };
    IndicesEmpresa.mes = {
        column: IndicesEmpresa.proxy.columns.Mes.index,
        indices: {
            elemID: "chart1_div",
            chartOptions: ["BarChart","chart1_div", "Indices IF / IOP / IE Por Mes",
                "porcentaje","Mes",400,"horizontal",["#3366cc","#dc3912","#ff9900"],"#,###%"],
            chartWrapper: {}
        },
        ingresos: {
            elemID: "chart2_div",
            chartOptions: ["BarChart","chart2_div","Total Ingresos Por Mes",
                "Ingresos","Mes",400,"horizontal",["#5e8043","#F15854"],"$#,###.###"],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart3_div",
            chartOptions:["BarChart","chart3_div","Totales de Horas Por Mes",
                "Horas","Mes",400,"horizontal",["#5DA5DA","#60BD68","#FAA43A"]],
            chartWrapper: {}
        },
        horasAdd: {
            elemID:"chart4_div",
            chartOptions:["BarChart","chart4_div","Totales de Horas Por Mes",
                "Horas","Mes",400,"horizontal",["#BAFFAB","#535E80","#CCCC99"]],
            chartWrapper: {}
        },
        noFacturables: {
            elemID:"chart5_div",
            chartOptions:["BarChart","chart5_div",
                "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Mes","Cantidad",
                "Mes",400,"horizontal",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
                    "#888888"]],
            chartWrapper: {}
        }

    };
    IndicesEmpresa.transformToClass = function(scale){
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
    IndicesEmpresa.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,allowNone,label){
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
    IndicesEmpresa.createTableChart = function(){
        return new google.visualization.ChartWrapper({
            chartType: 'Table',
            containerId: 'tableChart_div',
            options: {
                page: 'enable',
                pageSize: 10,
                height: "250px"
            }
        });
    };
    IndicesEmpresa.prototype.draw = function(){
        var tableChart = IndicesEmpresa.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
            dashboard._fillData(dt);
        });
        this._createDashboard(tableChart);
    };
    IndicesEmpresa.prototype._fillData = function(tableChart){
        for (section in this.sections) {
            var sectionObject = this.sections[section], dataTable;
            for (chart in this.charts) {
                var chartObject = this.charts[chart],
                    transformedDataTable;
                sectionObject[chart].chartWrapper = drawTendencyChart.apply({},
                    sectionObject[chart].chartOptions);
                if (chartObject.dynamicAggregation === true) {
                    dataTable = this._createDynamicDataTable(tableChart,
                        sectionObject, chartObject);
                }
                else {
                    dataTable = this._getAgrupatedDataSum(tableChart,
                        [sectionObject.column], chartObject.columns);
                }
                console.log(sectionObject[chart].chartWrapper);
                transformedDataTable = chartObject.transform ?
                    chartObject.transform.fx(dataTable,
                        chartObject.transform.columns) : dataTable;
                sectionObject[chart].chartWrapper.setDataTable(transformedDataTable);
                this.sections[section][chart].chartWrapper.draw();
            }
        }
    };
    IndicesEmpresa.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter];
            var currentCreatedFilter = IndicesEmpresa.createFilter(filterElement.elemID,
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
    IndicesEmpresa.prototype._getAgrupatedDataSum = function(dt, groupColumn, cols){
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
    IndicesEmpresa.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                IndicesEmpresa.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        IndicesEmpresa.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };
    IndicesEmpresa.getDynamicValue = function(dataTable,columnIndex,distinctColValue,
                                         aggregationFn,staticDependencies, dynamicDependencies){
        var dynamicValues = [];
        if (dynamicDependencies.length > 0){

            dynamicDependencies.forEach(function(dynamicDependency){
                try {
                    var fn = IndicesEmpresa.getDynamicValue;
                    var dynamicValue = fn(dataTable,columnIndex,distinctColValue,
                        dynamicDependency.aggregationFn,dynamicDependency.dependency.static(),
                        dynamicDependency.dependency.dynamic);

                    dynamicValues.push(dynamicValue);
                }
                catch (err) {
                    console.error(err);
                }

            });
        }
        return Aggregation.customSum(dataTable,
            [{column: columnIndex, value: distinctColValue}], aggregationFn, staticDependencies, dynamicValues);

    };

    IndicesEmpresa.prototype._createDynamicDataTable = function(dt, sectionObject, chartObject){
        var dynamicDataTable = new google.visualization.DataTable(),
            columnIndex = sectionObject.column,
            distinctedGroupByCol = dt.getDistinctValues(columnIndex),
            rows = [], columnsLabelSetted = false;
        dynamicDataTable.addColumn('number',dt.getColumnLabel(columnIndex));
        distinctedGroupByCol.forEach(function(distinctColValue){
            var rowValues = [distinctColValue];
            chartObject.columns.forEach(function(column){
                if (!columnsLabelSetted) {
                    dynamicDataTable.addColumn('number', column.label);
                }
                rowValues.push(IndicesEmpresa.getDynamicValue(dt,columnIndex,
                    distinctColValue,column.aggregationFn,
                    column.dependency.static(),column.dependency.dynamic));
            });
            rows.push(rowValues);
            columnsLabelSetted = true;
        });
        dynamicDataTable.addRows(rows);
        return dynamicDataTable;
    };

    function drawTendencyChart(chartType,containerId, title,vAxisTitle, hAxisTitle,height, orientation, colors, format){
        var chart = new google.visualization.ChartWrapper({
            'chartType': chartType,
            'containerId': containerId,
            'options': {
                title: title,
                vAxis: {title: vAxisTitle, minValue: 0, format: format},
                hAxis: {title: hAxisTitle, minValue: 0,
                viewWindow: {
                    min: 0,
                    max: 13
                },
                ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10 ,11, 12]
            },
                height: height,
                colors: colors,
                orientation: orientation
            }
        });
        return chart;
    }
    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        var dashboard = new IndicesEmpresa(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;
    window.IndicesEmpresa = IndicesEmpresa;

})(window,GoogleChartAdapter,Aggregation);
