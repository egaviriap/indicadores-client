/*
 * Created by egaviria on 07/05/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    document.getElementById("btnExport").style.display = "block";
    document.getElementById("checkboxesCharts").style.display = "none";
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    var innerHTML = "";
    var filtersInnerHTML = "";

    filtersInnerHTML = filtersInnerHTML + addDynamicFilters("filtroDiasLaborados_div");
    filtersInnerHTML = filtersInnerHTML + addDynamicFilters("filtroDiferencia_div");
    filtersInnerHTML = filtersInnerHTML + addDynamicFilters("filtroAnalista_div");
    innerHTML = innerHTML + addDivCharts("col-sm-12","TableChart_div");

    addChartstoHTML(innerHTML);
    addFilterstoHTML(filtersInnerHTML);

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });

    var filtroHoras = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroDiasLaborados_div',
        'options': {
            'filterColumnLabel': 'DiasLaborados',
            'ui': {'labelStacking': 'vertical',
                'label': 'Dias laborados',
                'cssClass': 'sliderClass'},
            'minValue': 0,
            'maxValue': 30
        }
    });

    var filtroAnalista = new google.visualization.ControlWrapper({
        'controlType': "CategoryFilter",
        'containerId': "filtroAnalista_div",
        'options': {
            'filterColumnLabel': "Analista",
            'ui': {'labelStacking': 'vertical',
                'allowNone': true,
                'allowTyping': true,
                'allowMultiple': true,
                'caption': "Analista",
                'label': "Analista"}
        }
    });

    var filtroDiferencia = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroDiferencia_div',
        'options': {
            'filterColumnLabel': 'Diferencia',
            'ui': {'labelStacking': 'vertical',
                'cssClass': 'sliderClass'},
            'minValue': 0,
            'maxValue': 30
        }
    });

    dashboard.
        bind(filtroHoras, filtroDiferencia).
        bind(filtroDiferencia, filtroAnalista).
        bind(filtroAnalista, tableChart).
        // Draw the dashboard
        draw(data);
    return dashboard;

}

