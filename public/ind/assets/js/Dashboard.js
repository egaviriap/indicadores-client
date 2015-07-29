/**
 * Created by egaviria on 01/07/2015.
 */
/**
 * Created by egaviria on 28/04/2015.
 */

(function(globals, GoogleChartAdapter, Aggregation){
    var Dashboard = function(jsonData, controlsID, chartsID){
        var proxyColumns = Dashboard.proxy.columns,
            gca = GoogleChartAdapter;
        this.checkBoxTimer = 0;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = Dashboard.filters;
        this.sections = {
            ciudad: Dashboard.ciudad,
            cliente: Dashboard.cliente,
            servicio: Dashboard.servicio,
            cargo: Dashboard.cargo,
            analista: Dashboard.analista
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
                scale: 0.3,
                columns: [
                    proxyColumns.ingresos,
                    proxyColumns.noIngresos
                ]

            },
            horas: {
                transform: null,
                scale: 0.3,
                columns: [
                    proxyColumns.horasLaborales,
                    proxyColumns.horasFacturables,
                    proxyColumns.horasNoFacturables,
                    proxyColumns.horasAF,
                    proxyColumns.horasANF,
                    proxyColumns.horasASC
                ]
            },
            noFacturables: {
                transform: null,
                scale: 0.3,
                columns: [
                    proxyColumns.horasIncap,
                    proxyColumns.horasComp,
                    proxyColumns.horasVac,
                    proxyColumns.horasInduccion,
                    proxyColumns.horasPreventa,
                    proxyColumns.horasInformacion,
                    proxyColumns.horasProyectoChoucair,
                    proxyColumns.horasError
                ]
            }

        };
        this.tableChart = {
            transform: null,
            scale: 1
        };

        this.createTemplate(controlsID, chartsID);
    };
    Dashboard.controller = {};
    Dashboard.proxy = {
        columns: {
            cliente:{
                index: 0,
                label: 'ClienteN',
                dependency: null
            },
            servicio:{
                index: 1,
                label: 'ServicioN',
                dependency: null
            },
            IE:{
                index: 2,
                label: 'IE',
                dependency: {
                    static: function(){
                        return [Dashboard.proxy.columns.horasFacturables.index];
                    },
                    dynamic:[
                        {
                            dependency: {
                                static: function(){
                                    return [Dashboard.proxy.columns.horasLaborales.index];
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
                index: 3,
                label: 'IOP',
                dependency: {
                    static: function(){
                        return [Dashboard.proxy.columns.horasFacturables.index,
                            Dashboard.proxy.columns.horasAF.index,
                            Dashboard.proxy.columns.horasASC.index];
                    },
                    dynamic:[
                        {
                            dependency: {
                                static: function(){
                                    return [Dashboard.proxy.columns.horasLaborales.index];
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
                index: 4,
                label: 'InFac',
                dependency: {
                    static: function(){
                        return [Dashboard.proxy.columns.horasFacturables.index,
                            Dashboard.proxy.columns.horasIncap.index,
                            Dashboard.proxy.columns.horasVac.index];
                    },
                    dynamic:[
                        {
                            dependency: {
                                static: function(){
                                    return [Dashboard.proxy.columns.horasLaborales.index];
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
            analista: {
                index:5,
                label: 'AnalistaN',
                dependency: null
            },
            cargo: {
                index:6,
                label: 'Cargo',
                dependency: null
            },
            horasIncap: {
                index:7,
                label: 'Incap',
                dependency: null
            },
            horasVac: {
                index:8,
                label: 'Vac',
                dependency: null
            },
            horasComp: {
                index:9,
                label: 'Comp',
                dependency: null
            },
            horasPreventa: {
                index: 10,
                label: 'Preventa',
                dependency: null
            },
            horasInduccion:{
                index:  11,
                label: 'Induccion',
                dependency: null
            },
            horasInformacion:{
                index:  12,
                label: 'Informacion',
                dependency: null
            },
            horasError: {
                index: 13,
                label: 'Error',
                dependency: null
            },
            horasProyectoChoucair:{
                index:  14,
                label: 'ProyectoChoucair',
                dependency: null
            },
            horasFacturables: {
                index: 15,
                label: 'HorasFacturables',
                dependency: null
            },
            horasNoFacturables: {
                index: 16,
                label: 'HorasNoFacturables',
                dependency: null
            },
            horasANF: {
                index: 17,
                label: 'HANF',
                dependency: null
            },
            horasAF: {
                index: 18,
                label: 'HAF',
                dependency: null
            },
            horasASC:{
                index:  19,
                label: 'HASC',
                dependency: null
            },
            horasRegistradas: {
                index: 20,
                label: 'HorasRegistradas',
                dependency: null
            },
            horasLaborales: {
                index: 21,
                label: 'HorasLaborales',
                dependency: null
            },
            ciudad: {
                index: 22,
                label: 'CiudadN',
                dependency: null
            },
            pais: {
                index: 23,
                label: 'Pais',
                dependency: null
            },
            ingresos: {
                index: 24,
                label: 'Ingresos',
                dependency: null
            },
            noIngresos: {
                index: 25,
                label: 'NoIngresos',
                dependency: null
            }
        }
    };
    Dashboard.filters = {
        ciudad: {
            elemID: "filterCiudad",
            columnName: "CiudadN",
            allowWrite: false,
            allowMultiple: true,
            label: "Ciudad"
        },
        cliente: {
            elemID: "filterCliente",
            columnName: "ClienteN",
            allowWrite: true,
            allowMultiple: true,
            label: "Cliente"
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
            columnName: "Cargo",
            allowWrite: false,
            allowMultiple: true,
            label: "Cargo"
        },
        analista: {
            elemID: "filterAnalista",
            columnName: "AnalistaN",
            allowWrite: true,
            allowMultiple: true,
            label: "Analista"
        }
    };
    Dashboard.ciudad = {
        column: Dashboard.proxy.columns.ciudad.index,
        indices: {
            elemID: "chart1_div",
            chartOptions: ["BarChart","chart1_div", "Indices IF / IOP / IE Por Ciudad",
                "porcentaje","Ciudad","#,###%",400,"vertical"],
            chartWrapper: {}
        },
        ingresos: {
            elemID: "chart2_div",
            chartOptions: ["BarChart","chart2_div","Suma Ingresos/No Ingresos Por Ciudad",
                "Cantidad","Ciudad","$#,###.###",400,"vertical",["#5e8043","#F15854"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart3_div",
            chartOptions:["BarChart","chart3_div","Suma Horas Por Ciudad","Ciudad","Cantidad",
                "decimal",400,"vertical",["#5DA5DA","#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        },
        noFacturables: {
            elemID:"chart4_div",
            chartOptions:["BarChart","chart4_div",
                "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Ciudad","Ciudad",
                "Cantidad","decimal",400,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
                    "#888888","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        }

    };
    Dashboard.cliente = {
        column: Dashboard.proxy.columns.cliente.index,
        indices: {
            elemID: "chart5_div",
            chartOptions: ["BarChart","chart5_div","Indices IF / IOP / IE Por Cliente",
                "porcentaje","Cliente","#,###%",400,"vertical"],
            chartWrapper: {}
        },
        ingresos: {
            elemID: "chart6_div",
            chartOptions: ["BarChart","chart6_div","Suma Ingresos/No Ingresos Por Cliente","Cantidad",
                "Cliente","$#,###.###",400,"vertical",["#5e8043","#F15854"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart7_div",
            chartOptions:["BarChart","chart7_div","Suma Horas Por Cliente",
                "Cliente","Cantidad","decimal",400,"vertical",["#5DA5DA",
                    "#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        },
        noFacturables: {
            elemID:"chart8_div",
            chartOptions:["BarChart","chart8_div",
                "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Cliente",
                "Cliente","Cantidad","decimal",400,"vertical",
                ["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
                    "#888888","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        }

    };
    Dashboard.servicio = {
        column: Dashboard.proxy.columns.servicio.index,
        indices: {
            elemID: "chart9_div",
            chartOptions: ["BarChart","chart9_div","Indices IF / IOP / IE Por Servicio",
                "porcentaje","Servicio","#,###%",400,"vertical"],
            chartWrapper: {}
        },
        ingresos: {
            elemID: "chart10_div",
            chartOptions: ["BarChart","chart10_div","Suma Ingresos/No Ingresos Por Servicio",
                "Cantidad","Servicio","$#,###.###",400,"vertical",["#5e8043","#F15854"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart11_div",
            chartOptions:["BarChart","chart11_div","Suma Horas Por Servicio","Servicio",
                "Cantidad","decimal",400,"vertical",["#5DA5DA","#60BD68","#FAA43A",
                    "#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        },
        noFacturables: {
            elemID:"chart12_div",
            chartOptions:["BarChart","chart12_div",
                "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Servicio",
                "Servicio","Cantidad","decimal",400,"vertical",
                ["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
                    "#888888","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        }
    };
    Dashboard.cargo = {
        column: Dashboard.proxy.columns.cargo.index,
        indices: {
            elemID: "chart13_div",
            chartOptions: ["BarChart","chart13_div","Indices IF / IOP / IE Por Cargo",
                "porcentaje","Cargo","#,###%",400,"vertical"],
            chartWrapper: {}
        },
        ingresos: {
            elemID: "chart14_div",
            chartOptions: ["BarChart","chart14_div","Suma Ingresos/No Ingresos Por Cargo",
                "Cantidad","Cargo","$#,###.###",400,"vertical",["#5e8043","#F15854"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart15_div",
            chartOptions:["BarChart","chart15_div","Suma Horas Por Cargo","Cargo",
                "Cantidad","decimal",400,"vertical",["#5DA5DA","#60BD68","#FAA43A",
                    "#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        },
        noFacturables: {
            elemID:"chart16_div",
            chartOptions:["BarChart","chart16_div",
                "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Cargo",
                "Cargo","Cantidad","decimal",400,"vertical",
                ["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
                    "#888888","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        }
    };
    Dashboard.analista = {
        column: Dashboard.proxy.columns.analista.index,
        indices: {
            elemID: "chart17_div",
            chartOptions: ["BarChart","chart17_div","Indices IF / IOP / IE Por Analista",
                "Analista","porcentaje","#,###%",400,"vertical"],
            chartWrapper: {}
        },
        ingresos: {
            elemID: "chart18_div",
            chartOptions: ["BarChart","chart18_div", "Suma Ingresos/No Ingresos Por Analista",
                "Analista","Cantidad","$#,###.###",400,"vertical",["#5e8043","#F15854"]],
            chartWrapper: {}
        },
        horas: {
            elemID:"chart19_div",
            chartOptions:["BarChart","chart19_div","Suma Horas Por Analista","Analista",
                "Cantidad","decimal",400,"vertical",["#5DA5DA","#60BD68","#FAA43A",
                    "#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        },
        noFacturables: {
            elemID:"chart20_div",
            chartOptions:["BarChart","chart20_div",
                "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Analista",
                "Analista","Cantidad","decimal",400,"vertical",
                ["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
                    "#888888","#A0805A","#D9C039","#F17CB0"]],
            chartWrapper: {}
        }

    };
    Dashboard.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter];
            var currentCreatedFilter = Dashboard.createFilter(filterElement.elemID, filterElement.columnName,filterElement.allowWrite,
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
    Dashboard.prototype.redraw = function(section){
        var now = new Date();
        var fecha = globals.getDate();
        if((fecha.ano <= now.getFullYear() && fecha.mes <= now.getMonth()+1) ||
            (fecha.ano < now.getFullYear()) ){
            for (chart in this.charts){
                this.sections[section][chart].chartWrapper.draw();
            }
        }

    };
    Dashboard.prototype.clear = function(section){
        for (chart in this.charts){
            console.dir(this.sections[section][chart].chartWrapper);
            this.sections[section][chart].chartWrapper.clear();
        }

    };
    Dashboard.prototype.draw = function(){
        var tableChart = Dashboard.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
            dashboard._fillData(dt);
        });
        this._createDashboard(tableChart);
    };
    Dashboard.prototype._fillData = function(tableChart){
        for (section in this.sections) {
            var sectionObject = this.sections[section], dataTable;
            for (chart in this.charts) {
                var chartObject = this.charts[chart],
                    transformedDataTable;
                sectionObject[chart].chartWrapper = globals.setChartWrapper.apply({},
                    sectionObject[chart].chartOptions);
                if (chartObject.dynamicAggregation === true) {
                    dataTable = this._createDynamicDataTable(tableChart,
                        sectionObject, chartObject);
                }
                else {
                    dataTable = this._getAgrupatedDataSum(tableChart,
                        [sectionObject.column], chartObject.columns);
                }
                transformedDataTable = chartObject.transform ?
                    chartObject.transform.fx(dataTable,
                        chartObject.transform.columns) : dataTable;
                sectionObject[chart].chartWrapper.setDataTable(transformedDataTable);
                globals.setChartAnnotation(sectionObject[chart].chartWrapper,
                    chartObject.columns);
                globals.setChartsOptions(transformedDataTable,
                    sectionObject[chart].chartWrapper, 150);

            }
        }

    };
    Dashboard.prototype._createDynamicDataTable = function(dt, sectionObject, chartObject){
        var dynamicDataTable = new google.visualization.DataTable(),
            columnIndex = sectionObject.column,
            distinctedGroupByCol = dt.getDistinctValues(columnIndex),
            rows = [], columnsLabelSetted = false;
        dynamicDataTable.addColumn("string",dt.getColumnLabel(columnIndex));
        distinctedGroupByCol.forEach(function(distinctColValue){
            var rowValues = [distinctColValue];
            chartObject.columns.forEach(function(column){
                if (!columnsLabelSetted) {
                    dynamicDataTable.addColumn('number', column.label);
                }
                rowValues.push(Dashboard.getDynamicValue(dt,columnIndex,
                    distinctColValue,column.aggregationFn,
                    column.dependency.static(),column.dependency.dynamic));
            });
            rows.push(rowValues);
            columnsLabelSetted = true;
        });
        dynamicDataTable.addRows(rows);
        return dynamicDataTable;
    };
    Dashboard.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";

        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }

        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                Dashboard.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        Dashboard.transformToClass(this.tableChart.scale) +
        '"></div>';

        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };
    Dashboard.prototype._getAgrupatedDataSum = function(dt, groupColumn, cols){
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
    Dashboard.getDynamicValue = function(dataTable,columnIndex,distinctColValue,
                                         aggregationFn,staticDependencies, dynamicDependencies){
        var dynamicValues = [];
        if (dynamicDependencies.length > 0){

            dynamicDependencies.forEach(function(dynamicDependency){
                try {
                    var fn = Dashboard.getDynamicValue;
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
    Dashboard.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,label){
        var controlWrapper = new google.visualization.ControlWrapper({
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
        google.visualization.events.addListener(controlWrapper, 'statechange', function(){
            Dashboard.onChangeCheckBoxFilterHandler();
        });
        return controlWrapper;
    };
    Dashboard.createTableChart = function(){
        return new google.visualization.ChartWrapper({
            chartType: 'Table',
            containerId: 'tableChart_div',
            options: {
                page: 'enable',
                pageSize: 10
            }
        });
    };
    Dashboard.onChangeCheckBoxFilterHandler = function(e){
        globals.saveCheckboxStatus();
        if (!!e) Dashboard.controller[e.value] = e.checked;
        if (this.checkBoxTimer) clearTimeout(this.checkBoxTimer);
        this.checkBoxTimer = setTimeout(function(){
            for (control in Dashboard.controller){
                if (Dashboard.controller[control] === true) {
                    Dashboard.instance.redraw(control);
                }
                else {
                    Dashboard.instance.clear(control);
                }
            }
        }, 500);
    };
    Dashboard.transformToClass = function(scale){
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
    function draw(jsonData) {
        loadCheckboxStatus();
        var dashboard = new Dashboard(jsonData, 'dashboard_div', 'charts');
        Dashboard.instance = dashboard;
        dashboard.draw();
        document.getElementById("wrapperFooter").style.display = "block";
        return dashboard.controls;
    }
    window.draw = draw;
    window.Dashboard = Dashboard;

})(window,GoogleChartAdapter, Aggregation);

