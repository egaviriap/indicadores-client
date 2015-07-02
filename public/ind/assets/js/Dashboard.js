/**
 * Created by egaviria on 01/07/2015.
 */
/**
 * Created by egaviria on 28/04/2015.
 */


function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    document.getElementById("wrapperFooter").style.display = "block";
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    var trIndices = new TableRowIndices();

//---------------------Ciudad-------------------------------------
    var chartCiudadIndices = charts("BarChart","chart1_div",
        "Indices IF / IOP / IE Por Ciudad",
        "porcentaje","Ciudad","#,###%",400,"horizontal");
    addDivCharts("col-sm-6","chart1_div", true);
    var chartCiudadSUMIngresos  = charts("BarChart","chart2_div",
        "Suma Ingresos/No Ingresos Por Ciudad",
        "Cantidad","Ciudad","$#,###.###",400,"horizontal",["#5e8043","#F15854"]);
    addDivCharts("col-sm-6","chart2_div" );
    var chartCiudadSumHoras  = comboCharts("ComboChart","chart20_div",
        "Suma Horas Por Ciudad",
        "Cantidad","Ciudad","decimal",400,"horizontal",["#5DA5DA","#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart20_div" );
    var chartCiudadDesperdicio  = charts("BarChart","chart3_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Ciudad",
        "Cantidad","Ciudad","decimal",400,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart3_div" );
//-----------------------------cliente-----------------------
    var chartClienteIndices = charts("BarChart","chart4_div",
        "Indices IF / IOP / IE Por Cliente",
        "porcentaje","Cliente","#,###%",400,"horizontal");
    addDivCharts("col-sm-6","chart4_div");
    var chartClienteSUMIngresos  = charts("BarChart","chart5_div",
        "Suma Ingresos/No Ingresos Por Cliente",
        "Cantidad","Cliente","$#,###.###",400,"horizontal",["#5e8043","#F15854"]);
    addDivCharts("col-sm-6","chart5_div" );
    var chartClienteSumHoras  = comboCharts("ComboChart","chart21_div",
        "Suma Horas Por Cliente","Cantidad","Ciudad","decimal",400,"horizontal",
        ["#5DA5DA","#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart21_div" );
    var chartClienteDesperdicio  = charts("BarChart","chart6_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Cliente",
        "Cantidad","Cliente","decimal",400,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart6_div" );
//-----------------------------servicio----------------------------------------------------
    var chartServicioIndices = charts("BarChart","chart7_div",
        "Indices IF / IOP / IE Por Servicio",
        "porcentaje","Servicio","#,###%",400,"horizontal");
    addDivCharts("col-sm-6","chart7_div");
    var chartServicioSUMIngresos  = charts("BarChart","chart8_div",
        "Suma Ingresos/No Ingresos Por Servicio",
        "Cantidad","Servicio","$#,###.###",400,"horizontal",["#5e8043","#F15854"]);
    addDivCharts("col-sm-6","chart8_div" );
    var chartServicioSumHoras  = comboCharts("ComboChart","chart22_div",
        "Suma Horas Por Servicio","Cantidad","Ciudad","decimal",400,"horizontal",
        ["#5DA5DA","#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart22_div" );
    var chartServicioDesperdicio  = charts("BarChart","chart9_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Servicio",
        "Cantidad","Servicio","decimal",400,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart9_div" );

//-----------------------------Cargo----------------------------------------------------
    var chartCargoIndices = charts("BarChart","chart10_div",
        "Indices IF / IOP / IE Por Cargo",
        "porcentaje","Cargo","#,###%",400,"horizontal");
    addDivCharts("col-sm-6","chart10_div");
    var chartCargoSUMIngresos  = charts("BarChart","chart11_div",
        "Suma Ingresos/No Ingresos Por Cargo",
        "Cantidad","Cargo","$#,###.###",400,"horizontal",["#5e8043","#F15854"]);
    addDivCharts("col-sm-6","chart11_div" );
    var chartCargoSumHoras  = comboCharts("ComboChart","chart23_div",
        "Suma Horas Por Cargo","Cantidad","Ciudad","decimal",400,"horizontal",
        ["#5DA5DA","#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart23_div" );
    var chartCargoDesperdicio  = charts("BarChart","chart12_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Cargo",
        "Cantidad","Cargo","decimal",400,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart12_div" );

//-----------------------------Analista----------------------------------------------------
    var chartAnalistaIndices = charts("BarChart","chart13_div",
        "Indices IF / IOP / IE Por Analista",
        "Analista","porcentaje","#,###%",400,"vertical");
    addDivCharts("col-sm-12","chart13_div");
    var chartAnalistaSUMIngresos  = charts("BarChart","chart14_div",
        "Suma Ingresos/No Ingresos Por Analista",
        "Analista","Cantidad","$#,###.###",400,"vertical",["#5e8043","#F15854"]);
    addDivCharts("col-sm-12","chart14_div" );
    var chartAnalistaSumHoras  = comboCharts("ComboChart","chart24_div",
        "Suma Horas Por Analista","Cantidad","Ciudad","decimal",400,"vertical",
        ["#5DA5DA","#60BD68","#FAA43A","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart24_div" );
    var chartAnalistaDesperdicio  = charts("BarChart","chart15_div",
        "Suma Incap/Vac/Comp/Preventa/Induccion/Informacion/Error/ProyectoChoucair/HANF/HAF/HASC Por Analista",
        "Analista","Cantidad","decimal",400,"vertical",["#FEA895","#46C09D","#CFC2FE","#ADB97F","#BAFFAB","#535E80","#CCCC99",
            "#888888","#A0805A","#D9C039","#F17CB0"]);
    addDivCharts("col-sm-12","chart15_div" );
    /**
     * @param {string} chartType
     * @param {string} containerId
     * @param {string} title
     * @param {string} vAxisTitle
     * @param {string} hAxisTitle
     * @param {string} format
     * @param {string} width
     * @param {string} height
     * @param {string} orientation
     * @param {Array<string>=} colors
     * @returns {google.visualization.ChartWrapper}
     */


    function charts(chartType,containerId, title,vAxisTitle, hAxisTitle,format,height, orientation, colors){
        return chart = new google.visualization.ChartWrapper({
            'chartType': chartType,
            'containerId': containerId,
            'options': {
                title: title,
                vAxis: {title: vAxisTitle, minValue: 0, format: format},
                hAxis: {title: hAxisTitle, minValue: 0, format: format},
                height: height,
                colors: colors,
                orientation: orientation
            }
        });
    }

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });
    addDivCharts("col-sm-12","TableChart_div" );

    var filtroCiudad = filters("CategoryFilter","filtroCiudad_div","CiudadN",false,true,"Todos","Ciudad",true);
    var filtroAnalista = filters("CategoryFilter","filtroAnalista_div","AnalistaN",true,false,"Todos", "Analista",true);
    var filtroCargo = filters("CategoryFilter","filtroCargo_div","Cargo",false,true,"Todos","Cargo",true);
    var filtroServicio = filters("CategoryFilter","filtroServicio_div","ServicioN",false,true,"Todos","Servicio",true);
    var filtroCliente = filters("CategoryFilter","filtroCliente_div","ClienteN",true,true,"Todos","Cliente",true);


    addDynamicFilters("filtroCiudad_div");
    addDynamicFilters("filtroCliente_div");
    addDynamicFilters("filtroServicio_div");
    addDynamicFilters("filtroCargo_div");
    addDynamicFilters("filtroAnalista_div");

    /**
     *
     * @param {string} typeFileter
     * @param {string} containerId
     * @param {string} columnLabel
     * @param {boolean} allowTyping
     * @param {boolean} allowMultiple
     * @param {string} caption
     * @param {string} label
     * @param {boolean} allowNone
     * @returns {google.visualization.ControlWrapper}
     */
    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption,label,allowNone, values){
        return filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'vertical',
                    'allowNone': allowNone,
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label},
                'values': values
            }
        });
    }

    google.visualization.events.addListener(tableChart, 'ready', function () {
        var dt = tableChart.getDataTable();
        var gca = new GoogleChartAdapter();

        var ciudad = dt.getDistinctValues(22);
        var cliente = dt.getDistinctValues(0);
        var Servicio = dt.getDistinctValues(1);
        var Cargo = dt.getDistinctValues(6);
        var analista = dt.getDistinctValues(5);

        var ciudadIndicesTable = trIndices.createIndexesData(dt, 22, ciudad, 21, 15, 18, 19, 7, 8);
        var ClienteIndicesTable = trIndices.createIndexesData(dt, 0, cliente, 21, 15, 18, 19, 7, 8);
        var ServicioIndicesTable = trIndices.createIndexesData(dt, 1, Servicio, 21, 15, 18, 19, 7, 8);
        var CargoIndicesTable = trIndices.createIndexesData(dt, 6, Cargo, 21, 15, 18, 19, 7, 8);
        var AnalistaIndicesTable = trIndices.createIndexesData(dt, 5, analista, 21, 15, 18, 19, 7, 8);


        var groupedDataCiudadSumIngresos = groupDataSumIngresos([22]);
        var groupedDataClienteSumIngresos = groupDataSumIngresos([0]);
        var groupedDataServicioSumIngresos = groupDataSumIngresos([1]);
        var groupedDataCargoSumIngresos = groupDataSumIngresos([6]);
        var groupedDataAnalistaSumIngresos = groupDataSumIngresos([5]);
       //
        function groupDataSumIngresos(groupColumn) {
            return groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 24,
                type: 'number',
                label: 'Ingresos',
                aggregation: google.visualization.data.sum
            }, {
                column: 25,
                label: 'No Ingresos',
                type: 'number' ,
                aggregation: google.visualization.data.sum
            }]);
        }

        var groupedDataCiudadSumHoras = sumaDeHoras([22]);
        var groupedDataClienteSumHoras = sumaDeHoras([0]);
        var groupedDataServicioSumHoras = sumaDeHoras([1]);
        var groupedDataCargoSumHoras = sumaDeHoras([6]);
        var groupedDataAnalistaSumHoras = sumaDeHoras([5]);



        function sumaDeHoras(groupColumn) {
            return groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 21,
                label: 'Horas Laborales',
                aggregation: google.visualization.data.sum,
                type: 'number'
            }, {
                column: 15,
                label: 'Horas Facturables',
                type: 'number',
                aggregation: google.visualization.data.sum

            }, {
                column: 16,
                label: 'Horas No Facturables',
                type: 'number',
                aggregation: google.visualization.data.sum

            }, {
                column: 17,
                label: 'HANF',
                type: 'number',
                aggregation: google.visualization.data.sum

            }, {
                column: 18,
                label: 'HAF',
                type: 'number',
                aggregation: google.visualization.data.sum

            }, {
                column: 19,
                label: 'HASC',
                type: 'number',
                aggregation: google.visualization.data.sum

            }
            ]);
        }


        var groupedDataCiudadDesperdicio = groupDataDetalleHoras([22]);
        var groupedDataClienteDesperdicio = groupDataDetalleHoras([0]);
        var groupedDataServicioDesperdicio = groupDataDetalleHoras([1]);
        var groupedDataCargoDesperdicio = groupDataDetalleHoras([6]);
        var groupedDataAnalistaDesperdicio = groupDataDetalleHoras([5]);

        function groupDataDetalleHoras(groupColumn) {
            return groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 7,
                label: 'Incap',
                aggregation: google.visualization.data.sum,
                type: 'number'
            }, {
                column: 8,
                label: 'Vac',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 9,
                label: 'Comp',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 10,
                label: 'Preventa',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 11,
                label: 'Induccion',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 12,
                label: 'Informacion',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 13,
                label: 'Error',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }, {
                column: 14,
                label: 'ProyectoChoucair',
                type: 'number' ,
                aggregation: google.visualization.data.sum

            }
            ]);
        }


//------------------------------ciudades-------------------------------------------------------------------
        chartCiudadIndices.setDataTable(gca.convertColsToPercentage(ciudadIndicesTable,[1,2,3]));
        chartCiudadSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataCiudadSumIngresos,[1,2]));
        chartCiudadDesperdicio.setDataTable(groupedDataCiudadDesperdicio);
        chartCiudadSumHoras.setDataTable(groupedDataCiudadSumHoras);
        setOptionsCharts(groupedDataCiudadDesperdicio,chartCiudadDesperdicio,150);
        chartCiudadIndices.draw();
        chartCiudadSUMIngresos.draw();
        chartCiudadSumHoras.draw();
        chartCiudadDesperdicio.draw();
//-----------------------------clientes---------------------------------------------------------------------
        chartClienteIndices.setDataTable(gca.convertColsToPercentage(ClienteIndicesTable,[1,2,3]));
        chartClienteSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataClienteSumIngresos,[1,2]));
        chartClienteDesperdicio.setDataTable(groupedDataClienteDesperdicio);
        chartClienteSumHoras.setDataTable(groupedDataClienteSumHoras);
        setOptionsCharts(groupedDataClienteDesperdicio,chartClienteDesperdicio,150);
        chartClienteIndices.draw();
        chartClienteSUMIngresos.draw();
        chartClienteSumHoras.draw();
        chartClienteDesperdicio.draw();
//----------------------------Servicio----------------------------------------------------------------------
        chartServicioIndices.setDataTable(gca.convertColsToPercentage(ServicioIndicesTable,[1,2,3]));
        chartServicioSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataServicioSumIngresos,[1,2]));
        chartServicioDesperdicio.setDataTable(groupedDataServicioDesperdicio);
        chartServicioSumHoras.setDataTable(groupedDataServicioSumHoras);
        setOptionsCharts(groupedDataServicioDesperdicio,chartServicioDesperdicio,150);
        chartServicioIndices.draw();
        chartServicioSUMIngresos.draw();
        chartServicioSumHoras.draw();
        chartServicioDesperdicio.draw();
//----------------------------Cargo----------------------------------------------------------------------
        chartCargoIndices.setDataTable(gca.convertColsToPercentage(CargoIndicesTable,[1,2,3]));
        chartCargoSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataCargoSumIngresos,[1,2]));
        chartCargoDesperdicio.setDataTable(groupedDataCargoDesperdicio);
        chartCargoSumHoras.setDataTable(groupedDataCargoSumHoras);
        setOptionsCharts(groupedDataCargoDesperdicio,chartCargoDesperdicio,150);
        chartCargoIndices.draw();
        chartCargoSUMIngresos.draw();
        chartCargoSumHoras.draw();
        chartCargoDesperdicio.draw();
//----------------------------Analista----------------------------------------------------------------------
        chartAnalistaIndices.setDataTable(gca.convertColsToPercentage(AnalistaIndicesTable,[1,2,3]));
        chartAnalistaSUMIngresos.setDataTable(gca.convertColsToCurrency(groupedDataAnalistaSumIngresos,[1,2]));
        chartAnalistaDesperdicio.setDataTable(groupedDataAnalistaDesperdicio);
        chartAnalistaSumHoras.setDataTable(groupedDataAnalistaSumHoras);
        //Indices
        setOptionsCharts(AnalistaIndicesTable,chartAnalistaIndices,50);
        //Ingresos
        setOptionsCharts(groupedDataAnalistaSumIngresos,chartAnalistaSUMIngresos,50);
        //Suma de Horas
        setOptionsCharts(groupedDataAnalistaSumHoras,chartAnalistaSumHoras,140);
        //Desperdicios
        setOptionsCharts(groupedDataAnalistaDesperdicio,chartAnalistaDesperdicio,150);
        chartAnalistaIndices.draw();
        chartAnalistaSUMIngresos.draw();
        chartAnalistaSumHoras.draw();
        chartAnalistaDesperdicio.draw();
    });

    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroCiudad, filtroCliente).
        bind(filtroCliente, filtroServicio).
        bind(filtroServicio, filtroCargo).
        bind(filtroCargo, filtroAnalista).
        bind(filtroAnalista, tableChart).
        // Draw the dashboard
        draw(data);
}

