const assert = require ('assert')
const api = require ('../api')
const Context = require('./../db/strategies/base/contexStrategy')
const PostGres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/shemas/usuarioSchema')

let app = {}
const USER = {    
    username: 'Xuxadasilva',
    password: '123'
}

const USER_DB ={
   username: USER.username.toLowerCase(),
    password:'$2b$04$7p/LPSvfXFDVCmPBBzcGy.IAVbHqRJLGXbs8/FJl55OHCMpxphI8O'
}

describe('Auth test suite', function (){
    this.beforeAll(async () =>{
        app = await api
        const connectionPostgres = await PostGres.connect()
        const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new PostGres(connectionPostgres, model))
        await postgres.update(null, USER_DB, true)
    })

    it ('deve obter um toker', async () => {
        const result  = await app.inject ({
            method: 'POST',
            url: '/login',
            payload: USER
        })
       
        const statusCode = result.statusCode
        console.log('statuscode', statusCode)
        const dados= JSON.parse(result.payload)
        console.log('dados', dados)
        //assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10) 
    })
    it('deve retorna não autorizado ao tentar obter um login errado', async() => {
        const result  = await app.inject ({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'xxxxnnnssd',
                password:'123'
            }
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized")
    })
})