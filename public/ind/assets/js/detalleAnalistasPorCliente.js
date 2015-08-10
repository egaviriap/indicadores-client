/*
 * Created by egaviria on 07/05/2015.
 */

(function(globals, GoogleChartAdapter){
    var detalleAnalistasPorCliente = function(jsonData, controlsID, chartsID){

        var proxyColumns = detalleAnalistasPorCliente.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = detalleAnalistasPorCliente.filters;
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.createTemplate(controlsID, chartsID);
    };
    detalleAnalistasPorCliente.proxy = {
        columns: {
            Analista:{
                index: 0,
                label: 'Analista'
            },
            Cargo:{
                index: 1,
                label: 'Cargo'
            },
            cliente: {
                index:2,
                label: 'Cliente'
            },
            pais: {
                index:3,
                label: 'Pais'
            }
        }
    };
    detalleAnalistasPorCliente.filters = {
        pais: {
            elemID: "filterPais",
            columnName: "Pais",
            allowWrite: false,
            allowMultiple: true,
            label: "Pais"
        },
        cliente: {
            elemID: "filterCliente",
            columnName: "Cliente",
            allowWrite: true,
            allowMultiple: true,
            label: "Cliente"
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
            columnName: "Analista",
            allowWrite: true,
            allowMultiple: true,
            label: "Analista"
        }

    };
    detalleAnalistasPorCliente.transformToClass = function(scale){
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
    detalleAnalistasPorCliente.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,label){
        return new google.visualization.ControlWrapper({
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
    };
    detalleAnalistasPorCliente.createTableChart = function(){
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
    detalleAnalistasPorCliente.prototype.draw = function(){
        var tableChart = detalleAnalistasPorCliente.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
        });
        this._createDashboard(tableChart);
    };
    detalleAnalistasPorCliente.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter];
            var currentCreatedFilter = detalleAnalistasPorCliente.createFilter(filterElement.elemID,
                filterElement.columnName,filterElement.allowWrite,
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
    detalleAnalistasPorCliente.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                detalleAnalistasPorCliente.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        detalleAnalistasPorCliente.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        document.getElementById("checkboxesCharts").style.display = "none";
        var dashboard = new detalleAnalistasPorCliente(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;

})(window,GoogleChartAdapter);