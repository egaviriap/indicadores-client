/*
 * Created by egaviria on 07/05/2015.
 */


(function(globals, GoogleChartAdapter){
    document.getElementById("checkboxesCharts").style.display = "none";

    var ReporteMaxtime = function(jsonData, controlsID, chartsID){

        var proxyColumns = ReporteMaxtime.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = ReporteMaxtime.filters;
        this.sections = {

        };
        this.charts = {

        };
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };

    ReporteMaxtime.proxy = {
        columns: {
            uen: {
                index: 0,
                label: 'UEN'
            },
            cliente: {
                index: 1,
                label: 'Cliente'
            },
            pais:{
                index: 2,
                label: 'Pais'
            },
            ano: {
                index: 3,
                label: 'ano'
            },
            mes:{
                index: 4,
                label: 'mes'
            },
            dia:{
                index: 5,
                label: 'dia'
            },
            analista:{
                index: 6,
                label: 'analista'
            },
            cedula:{
                index: 7,
                label: 'cedula'
            },
            cargo:{
                index: 8,
                label: 'cargo'
            },
            servicio:{
                index: 9,
                label: 'servicio'
            },
            proyecto:{
                index: 10,
                label: 'proyecto'
            },
            facturable:{
                index: 11,
                label: 'facturable'
            },
            actividad:{
                index: 12,
                label: 'actividad'
            },
            grupoActividad:{
                index: 13,
                label: 'grupoActividad'
            },
            horasInvertidas:{
                index: 14,
                label: 'horasInvertidas'
            },
            observaciones:{
                index: 15,
                label: 'observaciones'
            },
            tipoTiempo:{
                index: 16,
                label: 'tipoTiempo'
            },
            tarifa:{
                index: 17,
                label: 'tarifa'
            },
            valorTotal:{
                index: 18,
                label: 'valorTotal'
            }
        }
    };
    ReporteMaxtime.filters = {
        cliente: {
            elemID: "filterCliente",
            columnName: "Cliente",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Cliente"
        },
        serviico: {
            elemID: "filterServicio",
            columnName: "Servicio",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Servicio"
        },
        analista: {
            elemID: "filterAnalista",
            columnName: "Analista",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Analista"
        }
    };

    ReporteMaxtime.transformToClass = function(scale){
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
    ReporteMaxtime.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,allowNone,label){
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
            }
        });
    };

    ReporteMaxtime.createTableChart = function(){
        return new google.visualization.ChartWrapper({
            chartType: 'Table',
            containerId: 'tableChart_div',
            options: {
                page: 'enable',
                pageSize: 10,
                width: "100%"
            }
        });
    };
    ReporteMaxtime.prototype.draw = function(){
        var tableChart = ReporteMaxtime.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
        });
        this._createDashboard(tableChart);
    };

    ReporteMaxtime.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter], currentCreatedFilter;
                currentCreatedFilter = ReporteMaxtime.createFilter(filterElement.elemID,
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
    ReporteMaxtime.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                ReporteMaxtime.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        ReporteMaxtime.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        var dashboard = new ReporteMaxtime(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;
    window.ReporteMaxtime = ReporteMaxtime;

})(window,GoogleChartAdapter);