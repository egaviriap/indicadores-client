/**
 * Created by egaviria on 15/05/2015.
 */


;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    addDynamicFilters("filtroCliente_div");
    addDynamicFilters("filtroServicio_div");
    addDynamicFilters("filtroValor_div");
    addDivCharts("col-sm-6","chart1_div",true);
    addDivCharts("col-sm-6","chart2_div");
    addDivCharts("col-sm-12","TableChart_div");

    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",true,true,"Todos", "Cliente");
    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Servicio");

    var filtroValor =  new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroValor_div',
        'options': {
            'filterColumnLabel': 'ValorHora',
            'ui': {'labelStacking': 'vertical',
                'cssClass': 'sliderClass',
                'label': "Valor Por Hora",
                'format':{
                    'pattern': '$#,###'
                }
            },
            'minValue': 0,
            'maxValue': 200000

        }
    });



    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption,label){
        var filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'horizontal',
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label}
            }
        });

        return filter;
    }


    var chartCiudadHoras = charts("BarChart","chart1_div","Horas","Porcentage","Ciudad","decimal",400,"horizontal");
    var chartServicioHoras  = charts("BarChart","chart2_div","Indices IF / IOP POR CARGO","Porcentage","Servicio","decimal",400,"horizontal");


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
        var chart = new google.visualization.ChartWrapper({
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
        return chart;
    }


    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            page: 'enable',
            pageSize: 10
        }
    });



    //Instantiate and draw our chart, passing in some options.
    google.visualization.events.addListener(tableChart, 'ready', function (){
    var dt = tableChart.getDataTable();
    var gca = new GoogleChartAdapter();

    var groupedDataClienteHoras = groupDataSumIngresos([0]);
    var groupedDataServicioHora = groupDataSumIngresos([1]);

    function groupDataSumIngresos(groupColumn) {
        return groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
            column: 4,
            type: 'number',
            label: 'Horas',
            aggregation: google.visualization.data.sum
        }]);
    }


        chartCiudadHoras.setDataTable(groupedDataClienteHoras);
        chartCiudadHoras.draw();
        chartServicioHoras.setDataTable(groupedDataServicioHora);
        chartServicioHoras.draw();

    });
    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroCliente,filtroServicio).
        bind(filtroServicio, filtroValor).
        bind(filtroValor, tableChart).
        // Draw the dashboard
        draw(data);

}