/*
 * Created by egaviria on 07/05/2015.
 */


(function(globals, GoogleChartAdapter){
    document.getElementById("checkboxesCharts").style.display = "none";
    document.getElementById("clienteLI").style.display = "block";

    var ReporteFacturacion = function(jsonData, controlsID, chartsID){

        var proxyColumns = ReporteFacturacion.proxy.columns,
            gca = GoogleChartAdapter;
        this.data = new google.visualization.DataTable(jsonData);
        this.controls = new google.visualization.Dashboard(document.getElementById(controlsID));
        this.filters = ReporteFacturacion.filters;
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

    ReporteFacturacion.proxy = {
        columns: {
            cliente: {
                index: 0,
                label: 'CLIENTE'
            },
            ano: {
                index: 1,
                label: 'ANO'
            },
            mes:{
                index: 2,
                label: 'MES'
            },
            fecha: {
                index: 3,
                label: 'FECHA'
            },
            dia:{
                index: 4,
                label: 'DIA'
            },
            analista:{
                index: 5,
                label: 'ANALISTA'
            },
            servicio:{
                index: 6,
                label: 'SERVICIO'
            },
            codigoProyecto:{
                index: 7,
                label: 'CODIGO PROYECTO'
            },
            codigoSubProyecto:{
                index: 8,
                label: 'CODIGOSUBPROYECTO'
            },
            nombreSubProyecto:{
                index: 9,
                label: 'NOMBRE SUBPROYECTO'
            },
            actividad:{
                index: 10,
                label: 'ACTIVIDAD'
            },
            cluster:{
                index: 11,
                label: 'CLUSTER'
            },
            horasInvertidas:{
                index: 12,
                label: 'HORAS INVERTIDAS'
            },
            casual:{
                index: 13,
                label: 'CAUSAL'
            },
            observaciones:{
                index: 14,
                label: 'OBSERVACIONES'
            },
            tipoTiempo:{
                index: 15,
                label: 'TIPO TIEMPO'
            },
            horasAddicionales_a_Pagar:{
                index: 16,
                label: 'HorasAdicionalesAPagar'
            },
            horasAddCompensatorio:{
                index: 17,
                label: 'HorasAdicionalesCompensatorio'
            }
        }
    };
    ReporteFacturacion.filters = {
        serviico: {
            elemID: "filterServicio",
            columnName: "SERVICIO",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Servicio"
        },
        proyecto: {
            elemID: "filterProyecto",
            columnName: "CODIGO PROYECTO",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Proyecto"
        },
        analista: {
            elemID: "filterAnalista",
            columnName: "ANALISTA",
            allowWrite: true,
            allowMultiple: true,
            allowNone: true,
            label: "Analista"
        }
    };

    ReporteFacturacion.transformToClass = function(scale){
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
    ReporteFacturacion.createFilter = function(containerId,columnLabel,allowTyping,allowMultiple,allowNone,label){
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

    ReporteFacturacion.createTableChart = function(){
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
    ReporteFacturacion.prototype.draw = function(){
        var tableChart = ReporteFacturacion.createTableChart();
        var dashboard = this;
        google.visualization.events.addListener(tableChart, 'ready', function () {
            var dt = tableChart.getDataTable();
        });
        this._createDashboard(tableChart);
    };

    ReporteFacturacion.prototype._createDashboard = function(tableChart){
        var lastCreatedFilter = null;
        var filtersCounter = 1;
        for (filter in this.filters){
            var filterElement = this.filters[filter], currentCreatedFilter;
            currentCreatedFilter = ReporteFacturacion.createFilter(filterElement.elemID,
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
    ReporteFacturacion.prototype.createTemplate = function(controlsID, chartsID){
        var chartsFragment = "", filtersFragment = "", tableChartFragment="";
        for (filter in this.filters){
            filtersFragment += '<div id="' + this.filters[filter].elemID +
            '" class="filter"></div>';
        }
        for (section in this.sections){
            for (chart in this.charts){
                chartsFragment += '<div id="' +
                this.sections[section][chart].elemID + '" class="' +
                ReporteFacturacion.transformToClass(this.charts[chart].scale) +
                '"></div>';
            }
        }
        tableChartFragment += '<div id="' + "tableChart_div" + '" class="' +
        ReporteFacturacion.transformToClass(this.tableChart.scale) +
        '"></div>';
        globals.document.getElementById(controlsID).innerHTML = filtersFragment;
        globals.document.getElementById(chartsID).innerHTML = chartsFragment + " " + tableChartFragment ;
    };

    function draw(jsonData) {
        // Create our data table out of JSON data loaded from server.
        var dashboard = new ReporteFacturacion(jsonData, 'dashboard_div', 'charts');
        dashboard.draw();
        return dashboard.controls;
    }
    window.draw = draw;
    window.ReporteFacturacion = ReporteFacturacion;

})(window,GoogleChartAdapter);