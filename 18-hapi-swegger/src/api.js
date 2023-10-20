const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const Context = require('./db/strategies/base/contexStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')


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
    // console.log(...mapRoutes(new HeroRoute(context), HeroRoute.methods()))
    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'Pack.version'
        }
      
    }
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options:swaggerOptions

        }
    ])


    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
    return app

}
module.exports = main()