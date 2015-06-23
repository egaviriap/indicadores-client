/*
 * Created by egaviria on 07/05/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    document.getElementById("btnExport").style.display = "block";
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            page: 'enable',
            pageSize: 10
        }
    });

    addDivCharts("col-sm-12","TableChart_div",true);
    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Seleccione El Servicio");
    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",true,true,"Todos","Seleccione el Cliente");
    var filtroAnalista = filters("CategoryFilter","filtroAnalista_div","Analista",true,true,"Todos","Seleccione el Analista");

    addDynamicFilters("filtroCliente_div");
    addDynamicFilters("filtroServicio_div");
    addDynamicFilters("filtroAnalista_div");

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
        bind(filtroCliente, filtroServicio).
        bind(filtroServicio, filtroAnalista).
        bind(filtroAnalista, tableChart).
        // Draw the dashboard
        draw(data);
        

}

