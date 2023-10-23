const assert = require ('assert')
const api = require ('../api')


let app = {}


describe('Auth tast suite', function (){
    this.beforeAll(async () =>{
        app = await api
    })

    it ('deve obter um toker', async () => {
        const result  = await app.inject ({
            method: 'POST',
            url: '/login',
            payload:{
                username: 'Xuxadasilva',
                password: '123'
            }
        })
        const statusCode = result.statusCode
        const dados= JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})