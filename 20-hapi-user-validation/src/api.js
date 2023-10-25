const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const Context = require('./db/strategies/base/contexStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')
const HapiJWT = require('hapi-auth-jwt2')

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/shemas/usuarioSchema')

const JWT_SECRET = 'MEU_SEGREDAO_123'


const app = new Hapi.Server({
    port: 5000,
    host: 'localhost'
})

function mapRoutes(instance, methods) {

    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    const connectionPostgres = await Postgres.connect()
    const usuarioSchema = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchema))
    // console.log(...mapRoutes(new HeroRoute(context), HeroRoute.methods()))
    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'Pack.version'
        }

    }
    await app.register([
        HapiJWT,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions

        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // option:{
        // experesIn:20
        //}
        validate: async (dado, request) => {
           //console.log('dados', dado)
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase(),
               
            })
            if(!result){
                return {
                  isValid:false  
                }   
            }

            // verifica no se usuario continua ativo
            // verifica no banco se usuario continua pagando

            return {
                isValid: true // caso nao valido false
            }

        }
    })

    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
    ])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
    return app

}
module.exports = main()