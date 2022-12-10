------------------------  DDL  ------------------------

create table ip(
    id              integer         primary key,
    direccion       varchar(15)     not null,
    unique(ipv4)
);

create table reunion(
    id              integer         primary key,
    id_ip           integer         not null,
    hash            varchar(16)     not null,
    nombre          varchar(64)     not null,
    descripcion     varchar(120)    null,
    fecha_creacion  text            not null                default current_timestamp,
    foreign key(id_ip) references ip(id),
    unique(hash)
);

create table persona(
    id              integer         primary key,
    id_reunion      integer         not null,
    nombre          varchar(32)     not null,
    fecha_creacion  text            not null                default current_timestamp,
    foreign key(id_reunion) references reunion(id),
    unique(nombre)
);

create table persona_ip(
    id              integer         primary key,
    id_persona      integer         not null,
    id_ip           integer         not null,
    fecha           text            not null                default current_timestamp,
    foreign key(id_persona) references persona(id),
    foreign key(id_ip) references ip(id),
    unique(id_persona, id_ip, fecha)
);

create table mes(
    id              integer         primary key,
    mes             integer         not null,
    anio            integer         not null,
    unique(mes, anio)
);

create table reunion_mes(
    id              integer         primary key,
    id_reunion      integer         not null,
    id_mes          integer         not null,
    foreign key(id_reunion) references reunion(id),
    foreign key(id_mes) references mes(id),
    unique(id_reunion, id_mes)
);

create table persona_mes(
    id              integer         primary key,
    id_persona      integer         not null,
    id_mes          integer         not null,
    dia_del_mes     integer         not null,
    foreign key(id_persona) references persona(id),
    foreign key(id_mes) references mes(id),
    unique(id_persona, id_mes, dia_del_mes)
);

------------------------  DML  ------------------------

insert into ip(direccion) values('127.0.0.1');

insert into reunion(id_ip, hash, nombre) values(1, 'z03h6Twjd84J6aWK', 'Reunión de Ejemplo');