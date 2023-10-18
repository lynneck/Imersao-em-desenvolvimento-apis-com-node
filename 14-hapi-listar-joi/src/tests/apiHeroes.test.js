const assert = require ('assert')
const api = require ('./../api')
let app= {}

describe('Suite de testes da API Herois', function (){
    this.beforeAll( async () => {
        app = await api
    })

    it('should list /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=3'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('listar /herois - deve retorna somente 3 registros', async () =>{
        const TAMANHO_LIMITE = 3
        const result =  await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        
        const statusCode =result.statusCode
        assert.deepEqual(statusCode,200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })
    it('listar /herois - deve retorna um erro com limit incorreto', async () =>{
        const TAMANHO_LIMITE = 'AEEE'
        const result =  await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const errorResult = {
            "statusCode":400,
            "error":"Bad Request",
            "message":"Invalid request query input"
        }
       
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    
    })
    it('listar /herois - deve filtrar um item', async () =>{
        
        const NAME = 'Homem Aranha-1697148981932'
        const result =  await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=1000&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode =result.statusCode
        assert.deepEqual(statusCode,200)
        assert.deepEqual(dados[0].nome, NAME)
    })

})

