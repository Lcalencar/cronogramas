import Unidade from "../databases/models/unidade"
import { AppDataSource } from "../databases/connections/data-source"
import unidade from "../databases/models/unidade"

const cursor = AppDataSource.getRepository(Unidade)


type newUnidadeRequest = {
    descricao_unidade: string
    carga_horaria_unidade: number
    ordem : number
    fk_curso: string
}

type findOneUnidadeRequest = {
    id_unidade: string
  }

export class CreateunidadeService {
    async execute({
        descricao_unidade,
        carga_horaria_unidade,
        ordem,
        fk_curso,
    }: newUnidadeRequest): Promise<Unidade | Error> {

        if (await cursor.findOne({ where: { descricao_unidade } })) {
        return new Error("unidade já cadastrado!")
}

const unidade = cursor.create({
        descricao_unidade,
        carga_horaria_unidade, 
        ordem,
        fk_curso,
})

    await cursor.save(unidade)

    return unidade
    }
}
export class ReadAllUnidadeService {
    async execute() {
      // Executa a consulta "SELECT * FROM curso" no BD
      // Armazena todos os registros do Result Set na variável "cursos"
      // Neste caso, esta variável é uma lista de cursos
      const Unidades = await cursor.find()
      return Unidades
    }
  }
  
  export class ReadOneCursoService {
    // Recebe o ID do curso como parâmetro da Requisição do usuário
    async execute({ id_unidade }: findOneUnidadeRequest) {
      // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
      const unidade = await cursor.findOne({ where: { id_unidade } })
      // Se o curso não for encontrado no Result Set retorna um erro para o usuário
      if (!unidade) {
        return new Error("Unidade não encontrada!")
      }
      // Se o curso for encontrado retorna para o usuário o curso
      return unidade
    }
  }
  
  export class UpdateUnidadeService {}
  
  export class DeleteUnidadeService {
    // Recebe o ID do curso como parâmetro da Requisição do usuário
    async execute({ id_unidade }: findOneUnidadeRequest) {
      // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
      const Unidade = await cursor.findOne({ where: { id_unidade } })
      // Se o curso não for encontrado no Result Set retorna um erro para o usuário
      if (!Unidade) {
        return new Error("Unidade não encontrada!")
      }
      // Se o curso for encontrado, deleta do BD - DELETE FROM curso WHERE id_curso = ??
      await cursor.delete(Unidade)
      // Retorna para o usuário o curso que foi deletado
      return unidade
    }
  }
  