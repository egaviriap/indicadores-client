/*
 * Created by egaviria on 07/05/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    //document.getElementById("btnExport").style.display = "block";
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    //var formatter = new google.visualization.ArrowFormat();
    //formatter.format(data, 2); // Apply formatter to second columna
    addDynamicFilters("filtroHorasR_div");
    addDynamicFilters("filtroDiferencia_div");
    addDivCharts("col-sm-12","TableChart_div",true);
    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 100
        }
    });



    var filtroAnalista = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroHorasR_div',
        'options': {
            'filterColumnLabel': 'HorasRegistradas',
            'ui': {'labelStacking': 'vertical',
                'cssClass': 'sliderClass'}
        }
    });



    var filtroDiferencia = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroDiferencia_div',
        'options': {
            'filterColumnLabel': 'Diferencia',
            'ui': {'labelStacking': 'vertical',
                'cssClass': 'sliderClass'}
        }
    });


    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroAnalista, filtroDiferencia).
        bind(filtroDiferencia, tableChart).
        // Draw the dashboard
        draw(data);
        

}

