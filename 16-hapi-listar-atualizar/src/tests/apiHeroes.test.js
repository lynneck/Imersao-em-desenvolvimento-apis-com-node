const assert = require ('assert')
const api = require ('../api')
let app= {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'A mira'
}

let MOCK_ID = ''

describe.only('Suite de testes da API Herois', function (){
    this.beforeAll( async () => {
        app = await api
        const result = await app.inject({
            method:'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('should list /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
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
    it('deve cadastrar um heroi', async () =>{
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)    
        })
        const statusCode = result.statusCode
        //console.log('resultado', result.payload)
        const {message, _id} = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })

    it('atualizar PATCH - /herois/:id', async () =>{
        const _id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)    
        })
        const statusCode = result.statusCode
        console.log(statusCode)
        
        const dados = (result.payload)
        console.log('dados', dados)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados, "Heroi atualizado com sucesso!")
    })
    it('atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () =>{
        const _id = `652571303dcca60dd1df682a`
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)    
        })
        const statusCode = result.statusCode
        console.log(statusCode)
        
        const dados = (result.payload)
        console.log('dados', dados)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados, "Não foi possível atualizar")
    })


})

