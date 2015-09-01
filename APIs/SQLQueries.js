var SQLQuery = {

    IdNombreAnalistas:
        "USE [ControlCO]\
            EXEC  [dbo].[SP_CargarAnalistas]",

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

    totalAnalistasPorPais:
        "USE [ControlCO]\
                 EXEC  [dbo].[SP_ReporteTotalAnalistasPorPais] @Qano = @ano, @Qmes = @mes,  @Qdia = @dia",

    detalleAnalistasPorCliente:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteDetalleAnalistasPorCliente] @Qano = @ano, @Qmes = @mes,  @Qdia = @dia",

    indicesEmpresa:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteDeTendencias] @Qmes = @mes, @Qano = @ano",

    ingresosAddSC:
        "USE [ControlCO]\
             EXEC  [dbo].[SP_ReporteIngresosAddicionalesSC] @Qmes = @mes, @Qano = @ano"

};

module.exports = SQLQuery;

