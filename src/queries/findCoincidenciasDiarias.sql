select
	count(f.id) as `cantidadAsistencias`,
	f.id as `id`,
	f.dia_del_mes as `diaDelMes`,
	m.id as `mes.id`,
	m.mes as `mes.mes`,
	m.anio as `mes.anio`
from
	fecha f
	inner join mes m on m.id = f.id_mes
	inner join persona_fecha pf on pf.id_fecha = f.id
	inner join persona p on p.id = pf.id_persona
	inner join reunion r on r.id = p.id_reunion
where
	r.hash = :reunionHash
group by
	f.id;