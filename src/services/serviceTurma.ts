import Turma from "../databases/models/turma"
import { AppDataSource } from "../databases/connections/data-source"


const cursor = AppDataSource.getRepository(Turma)


type newTurmaRequest = {
    data_inicio: number
    data_fim: number
    horas_aula_dia: number
    fk_curso: string
}

type findOneTurmaRequest = {
    id_turma: string
  }

export class CreateTurmaService {
    async execute({
        data_inicio,
        data_fim,
        horas_aula_dia,
        fk_curso,
    }: newTurmaRequest): Promise<Turma | Error> {

        if (await cursor.findOne({ where: { fk_curso } })) {
        return new Error("Turma já cadastrada!")
}

const Turma = cursor.create({
        data_inicio,
        data_fim,
        horas_aula_dia,
        fk_curso,
})

    await cursor.save(Turma)

    return Turma
    }
}

export class ReadAllTurmaService {
    async execute() {
      // Executa a consulta "SELECT * FROM curso" no BD
      // Armazena todos os registros do Result Set na variável "cursos"
      // Neste caso, esta variável é uma lista de cursos
      const Turmas = await cursor.find()
      return Turmas
    }
  }
  
  export class ReadOneTurmasService {
    // Recebe o ID do curso como parâmetro da Requisição do usuário
    async execute({ id_turma }: findOneTurmaRequest) {
      // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
      const Turma = await cursor.findOne({ where: { id_turma } })
      // Se o curso não for encontrado no Result Set retorna um erro para o usuário
      if (!Turma) {
        return new Error("Curso não encontrado!")
      }
      // Se o curso for encontrado retorna para o usuário o curso
      return Turma
  }
} 
  
  export class UpdateTurmaService {}
  
  export class DeleteTurmaService {
    // Recebe o ID do curso como parâmetro da Requisição do usuário
    async execute({ id_turma }: findOneTurmaRequest) {
      // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
      const Turma = await cursor.findOne({ where: { id_turma } })
      // Se o curso não for encontrado no Result Set retorna um erro para o usuário
      if (Turma) {
        return new Error("Curso não encontrado!")
      }
      // Se o curso for encontrado, deleta do BD - DELETE FROM curso WHERE id_curso = ??
      await cursor.delete(Turma.id_turma)
      // Retorna para o usuário o curso que foi deletado
      return Turma
    }
  }
  
