create table unidade (
	idunidade VARCHAR  PRIMARY KEY,
	descricaoUnidade varchar NOT NULL,
	cargaHorariaUnidade int NOT NULL ,
	fkcurso  varchar REFERENCES CURSO (idCurso),
    ordem int NOT NULL
	)