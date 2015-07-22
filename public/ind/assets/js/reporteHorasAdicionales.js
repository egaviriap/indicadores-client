/**
 * Created by egaviria on 14/07/2015.
 */

;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    document.getElementById("mesLI").style.display = "none";
    document.getElementById("checkboxesCharts").style.display = "none";
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

    var innerHTML = "";
    var filtersInnerHTML = "";

    innerHTML = innerHTML +addDivCharts("col-sm-12","TableChart_div",true);
    filtersInnerHTML = filtersInnerHTML +addDynamicFilters("filtroCargo_div");
    filtersInnerHTML = filtersInnerHTML +addDynamicFilters("filtroAnalista_div");

    addChartstoHTML(innerHTML);
    addFilterstoHTML(filtersInnerHTML);
    var filtroCargo = filters("CategoryFilter","filtroCargo_div","Cargo",false,true,"Todos","Seleccione El Cargo");
    var filtroAnalista = filters("CategoryFilter","filtroAnalista_div","Analista",true,true,"Todos","Seleccione el Analista");


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
            controlType: typeFileter,
            containerId: containerId,
            options: {
                filterColumnLabel: columnLabel,
                ui: {
                    labelStacking: 'vertical',
                    allowTyping: allowTyping,
                    allowMultiple: allowMultiple,
                    caption: caption,
                    label: label
                }
            }
        });
        return filter;
    }



    dashboard.
        bind(filtroCargo, filtroAnalista).
        bind(filtroAnalista, tableChart).
        // Draw the dashboard
        draw(data);

    return dashboard;

}

