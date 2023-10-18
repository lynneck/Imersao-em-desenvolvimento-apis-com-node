const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip=0, 
                            limit=3,
                            nome
                          } = request.query
                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }  
                    
                    //console.log( skip)
                    //console.log('limite', limit)
                    
                    if(isNaN(skip))
                        throw error('Você inseriu o tipo de dados erroado. Deve ser um numero')
                    
                    if(isNaN(limit))
                        throw error('Você inseriu o tipo de dados erroado. Deve ser um numero')


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