const BaseRoute = require('./base/baseRoute')
const Joi = require ('joi')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            options:{
                validate:{
                    
                  query: Joi.object ({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100),
                        failAction:'log'
                    }).options({stripUnknown: true})
                }
            },

            handler: async (request, headers) => {
                try {
                    const { skip, 
                            limit,
                            nome
                          } = request.query
                    const query = nome ? {
                        nome:{$regex:new RegExp(nome, 'i')}}: {}                   

                    return this.db.read(query, parseInt(skip), parseInt(limit))

                } catch (error) {
                    console.log('DEU RUIM', error)
                    return "Erro interno do servidor"

                }
            }
        }
    }
}

module.exports = HeroRoutes