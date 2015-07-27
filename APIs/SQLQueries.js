var SQLQuery = {

        PromedioServicioCiudad:
            "SELECT A.*, PromedioValorHora*A.CantidadTotalHoras as IgresosServicio\
                FROM\
                (SELECT\
                CA.Nombre as 'ServicioN',\
                DA.Nombre as 'CiudadN',\
                AA.Ciudad,\
                CAST(SUM(AA.TotalHoras * BA.ValorHora )/SUM(AA.TotalHoras) as Decimal(8,2)) as PromedioValorHora,\
                SUM(AA.TotalHoras) as CantidadTotalHoras\
                FROM\
                (SELECT A.*, B.Pais, B.Ciudad\
                FROM\
                (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio FROM dbo.DetalleReporteDia as A\
                LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                GROUP BY C.Analista, B.Cliente, A.Servicio) A\
                LEFT JOIN dbo.Cliente as B ON A.Cliente = B.ID) AA\
                LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID AND AA.Pais = DA.Pais\
                WHERE BA.Mes = @mes AND BA.Ano = @ano\
                GROUP BY CA.Nombre, DA.Nombre, AA.Ciudad) A",


        HorasServicioCargoCiudad:
            "SELECT \
                DA.CargoN,\
                DA.ServicioN,\
                DA.CiudadClienteN,\
                DA.CiudadCliente,\
                DA.TotalHorasServicioCargo,\
                DB.PromedioValorHora*DA.TotalHorasServicioCargo as IngresosServicioCargo,\
                DB.PromedioValorHora as PromedioValorHora,\
                DA.TotalHorasCargo,\
                DA.IndiceServicioCargo,\
                DB.CantidadTotalHoras as TotalHorasServicioCiudad\
                FROM\
                (SELECT\
                CA.CargoN,\
                CA.ServicioN,\
                CA.Servicio,\
                CA.CiudadClienteN,\
                CA.CiudadCliente,\
                CA.TotalHorasServicioCargo,\
                CB.TotalHorasCargo,\
                CAST(CA.TotalHorasServicioCargo/CB.TotalHorasCargo as Decimal(6,2)) as IndiceServicioCargo\
                FROM\
                (SELECT\
                BA.*,\
                BB.Nombre as CargoN,\
                BC.Nombre as ServicioN,\
                BD.Nombre as CiudadClienteN,\
                BD.Pais as PaisCliente\
                FROM\
                (SELECT SUM(AA.TotalHoras) as TotalHorasServicioCargo,\
                CASE AA.Ciudad\
                WHEN 9 THEN 1\
                ELSE AA.Ciudad\
                END as CiudadCliente,\
                AA.Servicio, AB.Cargo FROM\
                (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                LEFT JOIN dbo.Analista as AB ON AA.Analista = AB.ID\
                GROUP BY AA.Ciudad, AA.Servicio, AB.Cargo) BA\
                LEFT JOIN dbo.Cargo as BB ON BA.Cargo = BB.ID\
                LEFT JOIN dbo.Servicio as BC ON BA.Servicio = BC.ID\
                LEFT JOIN dbo.Ciudad as BD ON BA.CiudadCliente = BD.ID) CA\
                LEFT JOIN\
                (SELECT SUM(AA.TotalHoras) as TotalHorasCargo, AA.Ciudad as CiudadCliente, AB.Cargo FROM\
                (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                LEFT JOIN dbo.Analista as AB ON AA.Analista = AB.ID\
                GROUP BY AA.Ciudad, AB.Cargo) CB\
                ON CB.Cargo = CA.Cargo AND CB.CiudadCliente = CA.CiudadCliente) DA\
                LEFT JOIN (SELECT\
                CA.Nombre as ServicioN,\
                CA.ID as Servicio,\
                DA.Nombre as CiudadN,\
                DA.ID as Ciudad,\
                CAST(SUM(AA.TotalHoras * BA.ValorHora)/SUM(AA.TotalHoras) as Decimal(8,2)) as PromedioValorHora,\
                SUM(AA.TotalHoras) as CantidadTotalHoras\
                FROM\
                (SELECT SUM(A.Horas) as TotalHoras, C.Analista, B.Cliente, A.Servicio, E.Ciudad  FROM dbo.DetalleReporteDia as A\
                LEFT JOIN dbo.Proyecto as B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.ReporteDia as C ON A.ReporteDia = C.ID\
                LEFT JOIN dbo.Actividad D ON D.ID = A.Actividad\
                LEFT JOIN dbo.Cliente as E ON B.Cliente = E.ID\
                WHERE Year(A.Fecha) = @ano and Month(A.Fecha) = @mes AND D.Facturable = 1\
                GROUP BY C.Analista, B.Cliente, A.Servicio, E.Ciudad) AA\
                LEFT JOIN dbo.Tarifa as BA ON AA.Cliente = BA.Cliente AND AA.Servicio = BA.Servicio\
                LEFT JOIN dbo.Servicio as CA ON AA.Servicio = CA.ID\
                LEFT JOIN dbo.Ciudad as DA ON AA.Ciudad = DA.ID\
                WHERE BA.Mes = @mes AND BA.Ano = @ano\
                GROUP BY CA.Nombre, DA.Nombre, CA.ID, DA.ID) DB\
                ON DA.CiudadCliente = DB.Ciudad AND DA.Servicio = DB.Servicio",

        IdNombreAnalistas:
            "select Id, Nombre from dbo.Analista\
                WHERE IsActive = 1\
                ORDER BY Nombre",


        HorasPorAnalista:
            "SELECT A.Fecha, A.Analista, MIN(A.HorasLaborales) as HorasLaborales, \
                SUM(A.HorasF) as HorasFacturables,\
                SUM(A.HorasNF) as HorasNoFacturables,\
                SUM(A.HorasF+A.HorasNF) as HorasRegistradas,\
                SUM(A.HorasNF*Incap) as Incap,\
                SUM(A.HorasNF*Vac) as Vac,\
                SUM(A.HorasNF*Comp) as Comp,\
                SUM(A.HorasNF*Preventa) as Preventa,\
                SUM(A.HorasNF*Induccion) as Induccion,\
                SUM(A.HorasNF*Informacion) as Informacion,\
                SUM(A.HorasNF*Error) as Error,\
                SUM(A.HorasNF*ProyectoChoucair) as ProyectoChoucair,\
                SUM(A.HorasNF*HoraAdicionalNF) as HorasAdicionalesNF,\
                SUM(A.HorasF*HoraAdicionalF) as HorasAdicionalesF,\
                SUM(A.HorasF*HoraAdicionalSC) as HorasAdicionalesSC,\
                A.FechaLaboral\
                FROM\
                (SELECT A.Actividad, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
                IIF(D.Fecha IS NULL AND A.Actividad NOT IN (6,8,10,12), 1, 0) as FechaLaboral,\
                IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
                IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
                IIF(E.GrupoActividad IN (3,11),1,0) as Comp,\
                IIF(E.GrupoActividad IN (16,25),1,0) as Preventa,\
                IIF(E.GrupoActividad = 24,1,0) as Induccion,\
                IIF(E.GrupoActividad IN (9,10,13,14),1,0) as Informacion,\
                IIF(E.GrupoActividad IN (15,17),1,0) as Error,\
                IIF(E.GrupoActividad IN (12),1,0) as ProyectoChoucair,\
                IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
                IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
                IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC\
                FROM\
                (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora,\
                SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
                SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
                FROM dbo.DetalleReporteDia A\
                LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
                WHERE B.Analista = @analista AND A.Fecha > '2014-01-01'\
                GROUP BY A.Fecha, B.Analista, A.Proyecto, A.Actividad, A.TipoHora) A\
                LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
                LEFT JOIN dbo.DiaNoLaboral D ON C.Pais = D.Pais AND CAST(D.Fecha as DATE) = A.Fecha\
                LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
                GROUP BY A.Fecha, A.Analista, A.FechaLaboral\
                ORDER BY A.Fecha DESC",

    ReporteDeTarifas :
            "SELECT\
                AA.Cliente, AA.Servicio, ISNULL((AA.ValorHora),0) as ValorHora,\
                ISNULL((AA.ValorHoraAdicional),0) as ValorHoraAdicional,\
                SUM(AA.Horas) as Horas\
                from\
                (select C.Nombre as Cliente, S.Nombre as Servicio, T.ValorHora,\
                SUM(DRD.Horas) as Horas, T.ValorHoraAdicional\
                from [MaxTimeCHC].[dbo].[ReporteDia] RD\
                inner join [MaxTimeCHC].[dbo].[DetalleReporteDia] DRD on (RD.ID = DRD.ReporteDia)\
                INNER JOIN [MaxTimeCHC].[dbo].[Proyecto] PR ON (DRD.Proyecto = PR.ID)\
                INNER JOIN [MaxTimeCHC].[dbo].[Cliente] C ON (C.ID = PR.Cliente)\
                INNER JOIN [MaxTimeCHC].[dbo].[Servicio] S ON (DRD.Servicio = S.ID)\
                inner join [MaxTimeCHC].[dbo].[Pais] P ON (C.Pais = P.ID)\
                LEFT JOIN [MaxTimeCHC].[dbo].[Tarifa] T\
                ON\
                (T.Cliente = C.ID AND T.Servicio = S.ID AND T.Ano = year(RD.Fecha) AND T.Mes = MONTH(RD.Fecha))\
                where year(RD.fecha) = @ano and month(RD.fecha) = @mes and Drd.Facturable = 1\
                GROUP BY C.Nombre, S.Nombre, T.ValorHora, P.Nombre, P.ID,T.ValorHoraAdicional) AA\
                group by AA.Cliente, AA.Servicio, ValorHora, ValorHoraAdicional",

        MaxTimeReport:
            "select AA.Sector as UEN,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Cliente) as Cliente,\
                AA.Pais,\
                AA.Ciudad,\
                Year(AA.Fecha) as Ano,\
                MONTH(AA.Fecha) AS Mes,\
                DAY(AA.Fecha) AS Dia,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Analista) as Analista,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Cedula) as Cedula,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Cargo) as Cargo,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Servicio) as Servicio,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Proyecto) AS Proyecto,\
                AA.Facturable,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Actividad) as Actividad,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.GrupoActividad) as GrupoActividad,\
                SUM(AA.Horas) as Horas_Invertidas,\
                [ControlCO].[dbo].[RemoveNonAlphaCharacters] (AA.Comentario) as Observaciones,\
                AA.TipoHora as Tipo_Tiempo, ISNULL((AA.Valor),0) as Tarifa,\
                (AA.TotalHoras * AA.valor) as ValorTotal\
                from\
                (select C.Nombre as Cliente, S.Nombre as Servicio, T.ValorHora,DRD.Fecha AS Fecha,\
                SUM(DRD.Horas) as Horas, P.Nombre as Pais, PR.Nombre as Proyecto,\
                Ciu.Nombre as Ciudad, A.Nombre as Analista,SE.Nombre as Sector,\
                A.Cedula as Cedula, Car.Nombre as Cargo, ACT.Nombre AS Actividad,\
                GA.Nombre as GrupoActividad, TH.Nombre AS TipoHora, DRD.Comentario,\
                SUM(DRD.Horas) As TotalHoras,\
                CASE TH.ID\
                WHEN 2 then T.ValorHoraAdicional\
                else T.ValorHora\
                end as Valor,\
                case Drd.Facturable\
                when 0 then 'NO'\
                when 1 then 'SI'\
                end as Facturable\
                from [MaxTimeCHC].[dbo].[DetalleReporteDia] DRD\
                inner join [MaxTimeCHC].[dbo].[ReporteDia] RD on (RD.ID = DRD.ReporteDia)\
                inner JOIN [MaxTimeCHC].[dbo].[Proyecto] PR ON (DRD.Proyecto = PR.ID)\
                inner join [MaxTimeCHC].[dbo].[TipoHora] TH ON (DRD.TipoHora = TH.ID)\
                inner join [MaxTimeCHC].[dbo].[Actividad] ACT ON (DRD.Actividad = ACT.ID)\
                inner join [MaxTimeCHC].[dbo].[GrupoActividad] GA on (ACT.GrupoActividad = GA.ID)\
                inner JOIN [MaxTimeCHC].[dbo].[Cliente] C ON (C.ID = PR.Cliente)\
                inner JOIN [MaxTimeCHC].[dbo].[Servicio] S ON (DRD.Servicio = S.ID)\
                inner join [MaxTimeCHC].[dbo].[Pais] P ON (C.Pais = P.ID)\
                inner join [MaxTimeCHC].[dbo].[Ciudad] CIU on (CIU.ID = C.Ciudad)\
                inner join [MaxTimeCHC].[dbo].[Analista] A on (RD.Analista = A.ID)\
                left join [MaxTimeCHC].[dbo].[Sector]  SE on (C.Sector = SE.ID)\
                inner join [MaxTimeCHC].[dbo].[Cargo] CAR ON (car.ID = A.Cargo)\
                LEFT JOIN [MaxTimeCHC].[dbo].[Tarifa] T ON (T.Cliente = C.ID AND\
                T.Servicio = S.ID AND T.Ano = year(DRD.Fecha) AND T.Mes = MONTH(DRD.Fecha))\
                where year(DRD.fecha) = @ano and MONTH(DRD.Fecha)= @mes\
                GROUP BY C.Nombre, S.Nombre, T.ValorHora, P.Nombre, P.ID,P.Nombre,\
                ciu.Nombre, T.ValorHoraAdicional, th.ID,\
                A.Nombre, Pr.Nombre, Se.Nombre, Drd.Facturable, A.Cedula,Car.Nombre,\
                ACT.Nombre, GA.Nombre, TH.Nombre, Drd.Fecha, Drd.Comentario) AA\
                group by AA.Cliente, AA.Servicio, ValorHora, AA.Pais, AA.Ciudad, \
                AA.Analista, AA.Proyecto, AA.Sector,\
                AA.Facturable, AA.Cedula, AA.Cargo,AA.Actividad, AA.GrupoActividad, \
                AA.TipoHora, AA.Fecha, AA.Comentario, AA.TotalHoras, AA.Valor\
                order by AA.Fecha,  AA.Cliente",

        UltimaFechaReporteXAnalista:
            "USE [ControlCO]\
                EXEC  [dbo].[SP_ReporteDeUltimaFecha] @Qano = @ano, @Qmes = @mes ",

        Dashboard:
            "SELECT C.Nombre as ClienteN, D.Nombre as ServicioN,\
                A.IE, A.IOP, A.InFac,A.AnalistaN,A.Cargo,A.Incap,A.Vac,A.Comp,\
                A.Preventa,A.Induccion,A.Informacion,\
                A.Error,A.ProyectoChoucair,A.HorasFacturables,A.HorasNoFacturables,A.HANF,A.HAF,A.HASC,\
                A.HorasRegistradas,\
                A.HorasLaborales,E.Nombre as CiudadN,F.Nombre as Pais,\
                ((A.HorasFacturables-HASC)*B.ValorHora)+((HASC)*B.ValorHoraAdicional) as Ingresos,\
                A.HorasLaborales*IIF(A.InFac < 1 AND A.CargoID NOT IN (7,11,12), 1-A.InFac, 0)*B.ValorHora as NoIngresos FROM (\
                SELECT CAST(IIF(HorasLaborales = 0, HorasFacturables/1, HorasFacturables/HorasLaborales) as DECIMAL(6,2)) as 'IE',\
                CAST(IIF(HorasLaborales = 0, (HorasFacturables-(HAF+HASC))/1, (HorasFacturables-(HAF+HASC))/HorasLaborales) as DECIMAL(6,2)) as 'IOP',\
                CAST(IIF(HorasLaborales = 0 OR (HorasLaborales-(Incap+Vac)) = 0, HorasFacturables/1,\
                HorasFacturables/(HorasLaborales-(Incap+Vac))) as DECIMAL(6,2)) as InFac,\
                A.* FROM (\
                SELECT B.Nombre as AnalistaN, C.Nombre as Cargo,\
                A.*,\
                B.Cargo as CargoID,\
                A.HorasFacturables+A.HorasNoFacturables as HorasRegistradas,\
                A.HorasFacturables+A.HorasNoFacturables-A.HANF-A.HASC-A.HAF as HorasLaborales\
                FROM\
                (SELECT Cliente,\
                Servicio,\
                A.Analista,\
                SUM(A.Incap) as Incap,\
                SUM(A.Vac) as Vac,\
                SUM(A.Comp) as Comp,\
                SUM(A.Preventa) as Preventa,\
                SUM(A.Induccion) as Induccion,\
                SUM(A.Informacion) as Informacion,\
                SUM(A.Error) as Error,\
                SUM(A.ProyectoChoucair) as ProyectoChoucair,\
                SUM(A.HorasFacturables) as HorasFacturables,\
                SUM(A.HorasNoFacturables) as HorasNoFacturables,\
                SUM(A.HorasAdicionalesNF) as HANF,\
                SUM(A.HorasAdicionalesF) as HAF,\
                SUM(A.HorasAdicionalesSC) as HASC\
                FROM\
                (SELECT A.Fecha, A.Analista,\
                SUM(A.HorasF) as HorasFacturables,\
                SUM(A.HorasNF) as HorasNoFacturables,\
                SUM(A.HorasNF*Incap) as Incap,\
                SUM(A.HorasNF*Vac) as Vac,\
                SUM(A.HorasNF*Comp) as Comp,\
                SUM(A.HorasNF*Preventa) as Preventa,\
                SUM(A.HorasNF*Induccion) as Induccion,\
                SUM(A.HorasNF*Informacion) as Informacion,\
                SUM(A.HorasNF*Error) as Error,\
                SUM(A.HorasNF*ProyectoChoucair) as ProyectoChoucair,\
                SUM(A.HorasNF*HoraAdicionalNF) as HorasAdicionalesNF,\
                SUM(A.HorasF*HoraAdicionalF) as HorasAdicionalesF,\
                SUM(A.HorasF*HoraAdicionalSC) as HorasAdicionalesSC,\
                Cliente,\
                Servicio\
                FROM\
                (SELECT A.Actividad, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
                IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
                IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
                IIF(E.GrupoActividad IN (3,11),1,0) as Comp,\
                IIF(E.GrupoActividad IN (16,25),1,0) as Preventa,\
                IIF(E.GrupoActividad = 24,1,0) as Induccion,\
                IIF(E.GrupoActividad IN (9,10,13,14),1,0) as Informacion,\
                IIF(E.GrupoActividad IN (15,17),1,0) as Error,\
                IIF(E.GrupoActividad IN (12),1,0) as ProyectoChoucair,\
                IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
                IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
                IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC,\
                C.ID as Cliente,\
                A.Servicio as Servicio\
                FROM\
                (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Servicio, A.Proyecto, A.Actividad, A.TipoHora,\
                SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
                SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
                FROM dbo.DetalleReporteDia A\
                LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
                WHERE YEAR(A.Fecha) = @ano AND MONTH(A.Fecha) = (@mes)\
                GROUP BY A.Fecha, B.Analista, A.Servicio, A.Proyecto, A.Actividad, A.TipoHora) A\
                LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
                LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
                LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
                GROUP BY A.Fecha, A.Analista, Cliente, Servicio) A\
                GROUP BY A.Analista, Cliente, Servicio) A\
                LEFT JOIN dbo.Analista B ON A.Analista = B.ID\
                LEFT JOIN dbo.Cargo C ON B.Cargo = C.ID\
                ) A\
                )A\
                LEFT JOIN (\
                SELECT Cliente, Servicio,\
                ISNULL(ValorHora,0) as ValorHora,\
                ISNULL(ValorHoraAdicional, 0) as ValorHoraAdicional FROM (\
                SELECT Cliente, Servicio,\
                ValorHora,\
                ValorHoraAdicional\
                FROM dbo.Tarifa     A\
                INNER JOIN dbo.Cliente B ON A.Cliente = B.ID\
                WHERE Mes in (@mes) AND Ano = @ano) A\
                ) B ON A.Cliente = B.Cliente AND B.Servicio = A.Servicio\
                INNER JOIN dbo.Cliente C ON A.Cliente = C.ID\
                INNER JOIN dbo.Servicio D ON A.Servicio = D.ID\
                INNER JOIN dbo.Ciudad E ON C.Ciudad = E.ID\
                INNER JOIN dbo.Pais F ON F.ID = E.Pais\
                ORDER BY 'IE' DESC, Analista",

    Tendencias:
        "SELECT C.Nombre as ClienteN, D.Nombre as ServicioN,\
            A.*,E.Nombre as CiudadN,F.Nombre as Pais,\
            ((A.HorasFacturables-HASC)*B.ValorHora)+((HASC)*B.ValorHoraAdicional) as Ingresos,\
            A.HorasLaborales*IIF(A.InFac < 1 AND A.CargoID NOT IN (7,11,12), 1-A.InFac, 0)*B.ValorHora as NoIngresos FROM (\
            SELECT CAST(IIF(HorasLaborales = 0, HorasFacturables/1, HorasFacturables/HorasLaborales) as DECIMAL(6,2)) as 'IE',\
            CAST(IIF(HorasLaborales = 0, (HorasFacturables-(HAF+HASC))/1, (HorasFacturables-(HAF+HASC))/HorasLaborales) as DECIMAL(6,2)) as 'IOP',\
            CAST(IIF(HorasLaborales = 0 OR (HorasLaborales-(Incap+Vac)) = 0, HorasFacturables/1,\
            HorasFacturables/(HorasLaborales-(Incap+Vac))) as DECIMAL(6,2)) as InFac,\
            A.* FROM (\
            SELECT B.Nombre as AnalistaN, C.Nombre as Cargo,\
            A.*,\
            B.Cargo as CargoID,\
            A.HorasFacturables+A.HorasNoFacturables as HorasRegistradas,\
            A.HorasFacturables+A.HorasNoFacturables-A.HANF-A.HASC-A.HAF as HorasLaborales\
            FROM\
            (SELECT Cliente,\
            Servicio,\
            A.Analista,\
            SUM(A.Incap) as Incap,\
            SUM(A.Vac) as Vac,\
            SUM(A.Comp) as Comp,\
            SUM(A.Preventa) as Preventa,\
            SUM(A.Induccion) as Induccion,\
            SUM(A.Informacion) as Informacion,\
            SUM(A.Error) as Error,\
            SUM(A.ProyectoChoucair) as ProyectoChoucair,\
            SUM(A.HorasFacturables) as HorasFacturables,\
            SUM(A.HorasNoFacturables) as HorasNoFacturables,\
            SUM(A.HorasAdicionalesNF) as HANF,\
            SUM(A.HorasAdicionalesF) as HAF,\
            SUM(A.HorasAdicionalesSC) as HASC\
            FROM\
            (SELECT A.Fecha, A.Analista,\
            SUM(A.HorasF) as HorasFacturables,\
            SUM(A.HorasNF) as HorasNoFacturables,\
            SUM(A.HorasNF*Incap) as Incap,\
            SUM(A.HorasNF*Vac) as Vac,\
            SUM(A.HorasNF*Comp) as Comp,\
            SUM(A.HorasNF*Preventa) as Preventa,\
            SUM(A.HorasNF*Induccion) as Induccion,\
            SUM(A.HorasNF*Informacion) as Informacion,\
            SUM(A.HorasNF*Error) as Error,\
            SUM(A.HorasNF*ProyectoChoucair) as ProyectoChoucair,\
            SUM(A.HorasNF*HoraAdicionalNF) as HorasAdicionalesNF,\
            SUM(A.HorasF*HoraAdicionalF) as HorasAdicionalesF,\
            SUM(A.HorasF*HoraAdicionalSC) as HorasAdicionalesSC,\
            Cliente,\
            Servicio\
            FROM\
            (SELECT A.Actividad, A.Fecha, A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
            IIF(E.GrupoActividad IN (4,5,6,7,8),1,0) as Incap,\
            IIF(E.GrupoActividad IN (19,20,21),1,0) as Vac,\
            IIF(E.GrupoActividad IN (3,11),1,0) as Comp,\
            IIF(E.GrupoActividad IN (16,25),1,0) as Preventa,\
            IIF(E.GrupoActividad = 24,1,0) as Induccion,\
            IIF(E.GrupoActividad IN (9,10,13,14),1,0) as Informacion,\
            IIF(E.GrupoActividad IN (15,17),1,0) as Error,\
            IIF(E.GrupoActividad IN (12),1,0) as ProyectoChoucair,\
            IIF(A.TipoHora = 11,1,0) as HoraAdicionalNF,\
            IIF(A.TipoHora = 1,1,0) as HoraAdicionalF,\
            IIF(A.TipoHora = 2,1,0) as HoraAdicionalSC,\
            C.ID as Cliente,\
            A.Servicio as Servicio\
            FROM\
            (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Servicio, A.Proyecto, A.Actividad, A.TipoHora,\
            SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
            SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
            FROM dbo.DetalleReporteDia A\
            LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
            WHERE YEAR(A.Fecha) = @ano AND MONTH(A.Fecha) = MONTH(GETDATE())-1\
            GROUP BY A.Fecha, B.Analista, A.Servicio, A.Proyecto, A.Actividad, A.TipoHora) A\
            LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
            LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
            LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
            GROUP BY A.Fecha, A.Analista, Cliente, Servicio) A\
            GROUP BY A.Analista, Cliente, Servicio) A\
            LEFT JOIN dbo.Analista B ON A.Analista = B.ID\
            LEFT JOIN dbo.Cargo C ON B.Cargo = C.ID\
            ) A\
            )A\
            LEFT JOIN (\
            SELECT Cliente, Servicio,\
            ISNULL(ValorHora,0) as ValorHora,\
            ISNULL(ValorHoraAdicional, 0) as ValorHoraAdicional FROM (\
            SELECT Cliente, Servicio,\
            ValorHora,\
            ValorHoraAdicional\
            FROM dbo.Tarifa     A\
            INNER JOIN dbo.Cliente B ON A.Cliente = B.ID\
            WHERE Mes = MONTH(GETDATE())-1 AND Ano = @ano) A\
            ) B ON A.Cliente = B.Cliente AND B.Servicio = A.Servicio\
            INNER JOIN dbo.Cliente C ON A.Cliente = C.ID\
            INNER JOIN dbo.Servicio D ON A.Servicio = D.ID\
            INNER JOIN dbo.Ciudad E ON C.Ciudad = E.ID\
            INNER JOIN dbo.Pais F ON F.ID = E.Pais\
            ORDER BY 'IE' DESC, Analista",

    horasAdicionales:
        "WITH\
            HorasAdicionalesYCompromisos(Analista, Comp,HANF,HAF,HASC)\
            AS\
            (\
            SELECT Analista, SUM(Comp) as Comp, SUM(HANF) as HANF, SUM(HAF) as HAF, SUM(HASC) as HASC FROM\
            (SELECT A.Analista, C.HorasLaborales, A.HorasF, A.HorasNF,\
            IIF(E.GrupoActividad IN (3,11),HorasNF,0) as Comp,\
            IIF(A.TipoHora = 11,HorasNF,0) as HANF,\
            IIF(A.TipoHora = 1,HorasF,0) as HAF,\
            IIF(A.TipoHora = 2,HorasF,0) as HASC\
            FROM\
            (SELECT CAST(A.Fecha as DATE) as Fecha, B.Analista, A.Servicio, A.Proyecto, A.Actividad, A.TipoHora,\
            SUM(IIF(A.Facturable = 1, A.Horas, 0)) as HorasF,\
            SUM(IIF(A.Facturable = 0, A.Horas, 0)) as HorasNF\
            FROM dbo.DetalleReporteDia A\
            LEFT JOIN dbo.ReporteDia B ON A.ReporteDia = B.ID\
            WHERE YEAR(A.Fecha) = @ano\
            GROUP BY A.Fecha, B.Analista, A.Servicio, A.Proyecto, A.Actividad, A.TipoHora) A\
            LEFT JOIN dbo.Proyecto B ON A.Proyecto = B.ID\
            LEFT JOIN dbo.Cliente C ON B.Cliente = C.ID\
            LEFT JOIN dbo.Actividad E ON A.Actividad = E.ID) A\
            GROUP BY Analista\
            ),\
            HorasAdicionalesPorCompromiso(Analista, Comp, HA)\
            AS(\
            SELECT Analista, Comp, (HANF+HAF+HASC) as HA FROM HorasAdicionalesYCompromisos\
            )\
            SELECT B.Nombre as Analista, C.Nombre as Cargo, A.Comp, A.HA, (A.HA-A.Comp) as Sueldo FROM\
            HorasAdicionalesPorCompromiso A\
            INNER JOIN dbo.Analista B ON A.Analista = B.ID\
            INNER JOIN dbo.Cargo C ON B.Cargo = C.ID\
            WHERE Ciudad IN (1,2)\
            ORDER BY Analista, Sueldo DESC;"



};

module.exports = SQLQuery;

