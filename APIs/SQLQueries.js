var SQLQuery = {

    IdNombreAnalistas:
        "select Id, Nombre from dbo.Analista\
            WHERE IsActive = 1\
            ORDER BY Nombre",

    HorasPorAnalista:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteHorasPorAnalista] @Qanalista = @analista",

    ReporteDeTarifas :
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteTarifas] @Qmes = @mes, @Qano = @ano",

    MaxTimeReport:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteMaxTime] @Qmes = @mes, @Qano = @ano",

    UltimaFechaReporteXAnalista:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteUltimaFecha] @Qdate = @date",

    Dashboard:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteGeneral] @Qmes = @mes, @Qano = @ano",

    horasAdicionales:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteHorasAdicionales] @Qano = @ano",

    analistasPorCliente:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteTotalAnalistasPorCliente] @Querydate = @Qdate",

    detalleAnalistasPorCliente:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteDetalleAnalistasPorCliente] @Querydate = @Qdate",

    indicesEmpresa:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteDeTendencias] @Qmes = @mes, @Qano = @ano",

    ingresosAddSC:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteIngresosAddicionalesSC] @Qmes = @mes, @Qano = @ano"

};

module.exports = SQLQuery;

