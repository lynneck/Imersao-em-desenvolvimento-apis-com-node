const assert = require ('assert')
const Postgres =  require('../db/strategies/postgres/postgres')
const HeroiSchema = require ('./../db/strategies/postgres/shemas/heroiShemas')
const Context = require('../db/strategies/base/contexStrategy')


 const MOCK_HEROI_CADASTRAR ={
    
    nome: 'Gaviao Negro',
    poder:'flexas',
    
     
 }
 const MOCK_HEROI_ATUALIZAR ={
    nome: 'Batman',
    poder:'Dinheiro',
    
     
 }

 let context = {}
 
describe('Postgres Strategy', function (){
    this.timeout(Infinity)
    this.beforeAll(async function (){
      const connection = await Postgres.connect()
      const model = await Postgres.defineModel(connection, HeroiSchema)
      context = new Context(new Postgres(connection, model))

      await context.delete()
      await context.create(MOCK_HEROI_ATUALIZAR)

    })
    it('PostgresSQL Connection', async function (){
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function(){
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        // pegar a primeira posição
        //const posicaoZero= result[0]
        // const [posiçao1, posiçao2] = ['esse e o 1','esse e o 2']
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    }) 
    it('atualizar', async function(){
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome:'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id,novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)

        /**
         * No javaScript temos uma tecnica chamada rest/spread que é um metodo usado para mergear objetos
         ou separa-lo
         {
            nome: 'Batman',
            poder: 'Dinheiro
         }

         {
            dataNascimento: '1998-01-01'
         }

         //final
         {
            nome: 'Batman',
            poder: 'Dinheiro,
             dataNascimento: '1998-01-01'
         }

         
         */
    })
    it('remover por id', async function(){
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })

    

})
