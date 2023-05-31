import { Entity,  PrimaryColumn, Column} from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("unidade")
export default class unidade {
    @PrimaryColumn()
    id_unidade: string

    @Column()
    fk_curso: string

    @Column({nullable: true})
     descricao_unidade: string 
     
     @Column({nullable: true })
     carga_horaria_unidade: number

    @Column ({nullable: true })
    ordem: number

    constructor (){
        this.id_unidade = uuid()

    }

}