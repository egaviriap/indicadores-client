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


    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            // minimize the footprint of the table in HTML
            page: 'enable',
            pageSize: 10
        }
    });

    addDivCharts("col-sm-12","TableChart_div",true);

    var filtroAnalista = filters("CategoryFilter","filtroAnalista_div","HorasRegistradas",false,true,"Todos","HorasRegistradas");

    addDynamicFilters("filtroAnalista_div");
    addDynamicFilters("filtroDiferencia_div");

    var filtroDiferencia = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroDiferencia_div',
        'options': {
            'filterColumnLabel': 'Diferencia',
            'ui': {'labelStacking': 'vertical',
                'cssClass': 'sliderClass'}
        }
    });



    /**
     *
     * @param {string} typeFileter
     * @param {string} containerId
     * @param {string} columnLabel
     * @param {boolean} allowTyping
     * @param {boolean} allowMultiple
     * @param {string} caption
     * @returns {google.visualization.ControlWrapper}
     */
    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption, label){
        var filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'vertical',
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label}

            }
        });

        return filter;
    }



    new google.visualization.Dashboard(document.getElementById("dashboard_div")).
        bind(filtroAnalista, filtroDiferencia).
        bind(filtroDiferencia, tableChart).
        // Draw the dashboard
        draw(data);
        

}

