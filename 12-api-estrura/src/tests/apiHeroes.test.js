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
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it.only('listar /herois - deve retorna somente 10 registros', async () =>{
        const result =  await app.inject({
            method:'GET',
            url:'/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode =result.statusCode
        assert.deepEqual(statusCode,200)
        assert.ok(dados.length === 10)
    })

})

