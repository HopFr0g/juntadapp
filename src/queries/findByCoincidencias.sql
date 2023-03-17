select distinct
	*
from
	fecha f
where
	f.id in (
		select
			pf.id_fecha
		from
			persona_fecha pf
			inner join persona p on pf.id_persona = p.id
			inner join reunion r on p.id_reunion = r.id
		where
			r.hash = :reunionHash
			and pf.id_persona in (:idPersonas)
		group by
			pf.id_fecha
		having
			count(distinct pf.id_persona) = (
				select
					count(distinct id_persona)
				from
					persona_fecha
				where
					id_persona in (:idPersonas)
			)
	);