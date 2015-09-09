/**
 * Created by egaviria on 14/07/2015.
 */

(function(globals, GoogleChartAdapter){
    var reporteHorasAdicionales = function(jsonData, controlsID, chartsID){

        var proxyColumns = reporteHorasAdicionales.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = reporteHorasAdicionales.filters;
        this.tableChart = {
            transform: null,
            scale: 1
        };
        this.filtroHoras = new google.visualization.ControlWrapper({
            'controlType': 'NumberRangeFilter',
            'containerId': 'filtroHoras',
            'options': {
                'ui': {
                    'format':{
                        'fractionDigits': 1,
                        'groupingSymbol': '.'
                    },
                    'ticks': 10,
                    'step': 10,
                    'unitIncrement': 10
                },
                'filterColumnLabel': 'Saldo',
                'minValue': -200,
                'maxValue': 200
            }
        });

        this.createTemplate(controlsID, chartsID);
    };
    reporteHorasAdicionales.proxy = {
        columns: {
            analista:{
                index: 0,
                label: 'Analista'
            },
            cargo:{
                index: 1,
                label: 'Cargo'
            },
            comp: {
                index:2,
                label: 'Comp'
            },
            ha: {
                index:3,
                label: 'HA'
            },
            saldo: {
                index:3,
                label: 'Saldo'
            }
        }
    };
    reporteHorasAdicionales.filters = {
        pais: {
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
    reporteHorasAdicionales.transformToClass = function(scale){
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
    reporteHorasAdicionales.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,label){
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
    reporteHorasAdicionales.createTableChart = function(){
        return new google.visualization.ChartWrapper({
            chartType: 'Table',
            containerId: 'tableChart_div',
            options: {
                page: 'enable',
                pageSize: 10,
                height: "250px",
                width: "100%"
            }
        });
    };
    reporteHorasAdicionales.prototype.draw = function(){
        var tableChart = reporteHorasAdicionales.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
        });
        this._createDashboard(tableChart);
    };
    reporteHorasAdicionales.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter];
            var currentCreatedFilter = reporteHorasAdicionales.createFilter(filterElement.elemID,
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
        this.controls.bind(lastCreatedFilter, this.filtroHoras)
            .bind(this.filtroHoras, tableChart).draw(this.data);
    };
    reporteHorasAdicionales.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                reporteHorasAdicionales.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        reporteHorasAdicionales.transformToClass(this.tableChart.scale) +
        '"></div>';
        filtersFragment = filtersFragment + '<div id="' + "filtroHoras" +
        '" class="filter"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        document.getElementById("checkboxesCharts").style.display = "none";
        var dashboard = new reporteHorasAdicionales(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;

})(window,GoogleChartAdapter);
