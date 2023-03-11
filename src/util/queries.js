const queryFindCoincidencias =
    "select distinct " +
    "f.dia_del_mes, " +
    "m.mes, " +
    "m.anio " +
    "from " +
    "reunion r " +
    "inner join persona p on p.id_reunion = r.id " +
    "inner join persona_fecha pf on pf.id_persona = p.id " +
    "inner join fecha f on f.id = pf.id_fecha " +
    "inner join mes m on m.id = f.id_mes " +
    "where " +
    "r.hash = :hash " +
    "and (" +
    "select " +
    "count(distinct pf2.id_persona) " +
    "from " +
    "reunion r2 " +
    "inner join persona p2 on p2.id_reunion = r2.id " +
    "inner join persona_fecha pf2 on pf2.id_persona = p2.id " +
    "where " +
    "r2.hash = r.hash" +
    ") = (" +
    "select " +
    "count(*) " +
    "from " +
    "reunion r2 " +
    "inner join persona p2 on p2.id_reunion = r2.id " +
    "inner join persona_fecha pf2 on pf2.id_persona = p2.id " +
    "where " +
    "r2.hash = r.hash " +
    "and pf2.id_fecha = pf.id_fecha" +
    ");";

module.exports = {
    queryFindCoincidencias
};