

function TableRowValorHora(){}


TableRowValorHora.prototype.tableRowsValorHora =
    function (dt, col, distinctedGroup,
        horasLaboralesColumn, horasFacturablesColumn, horasNoFacturablesColumn,
        vHColumn, HASCColumn, vHAColumn){
            var rows = [];
  			var aggr = new Aggregation();

            distinctedGroup.forEach(function(value){
                var row;
                var totalLaborales = aggr.customSum(dt,[{"column":col, "value":value}],function(horasLaborales){
                    return horasLaborales;
                },[horasLaboralesColumn]);
                var totalFacturable = aggr.customSum(dt,[{"column":col, "value":value}],function(horasFacturables){
                    return horasFacturables;
                },[horasFacturablesColumn]);

                var totalNoFacturable = aggr.customSum(dt,[{"column":col, "value":value}],function(horasFacturables){
                    return horasFacturables;
                },[horasNoFacturablesColumn]);

                var valorHoraxL = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(vh, horasLaborales){
                        return horasLaborales * vh;
                    },
                    [horasLaboralesColumn, vHColumn], [totalLaborales]);

                var valorHoraxF = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(horasFacturables, vh,  horasHASC, vhA){
                        return (((horasFacturables - horasHASC) * vh) + (horasHASC * vhA));
                    },
                    [horasFacturablesColumn, vHColumn, HASCColumn, vHAColumn]);

                var valorHoraxNF = aggr.customSum(dt,[{"column":col, "value":value}],
                    function(horasNoFacturables, vh){
                        return horasNoFacturables * vh;
                    },
                    [horasNoFacturablesColumn, vHColumn], [totalNoFacturable]);

                row = [value,valorHoraxL,valorHoraxF,valorHoraxNF];
                rows.push(row);

            });
            return rows;
};

TableRowValorHora.prototype.createValorHoraData =
    function (dataTable, col, distinctedGroup,
           horasLaboralesColumn, horasFacturablesColumn,horasNoFacturablesColumn,
           vhCol, HASCColumn, vHAColumn){
        var groupedDataServicioIndices = new google.visualization.DataTable();
        groupedDataServicioIndices.addColumn("string",dataTable.getColumnLabel(col));
        groupedDataServicioIndices.addColumn("number","Total Laborales");
        groupedDataServicioIndices.addColumn("number","Total Facturables");
        groupedDataServicioIndices.addColumn("number","Total No Facturables");
        groupedDataServicioIndices.addRows(this.tableRowsValorHora(dataTable, col, distinctedGroup,
            horasLaboralesColumn, horasFacturablesColumn,horasNoFacturablesColumn,
            vhCol, HASCColumn, vHAColumn));
        return groupedDataServicioIndices;
};