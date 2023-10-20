
const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('@hapi/boom')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            options: {
                tags:['api'],
                description: 'Deve listar herois',
                notes:'pode paginar resultados e filtrar por nome',
                validate: {

                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100),
                        failAction: 'log'
                    }).options({ stripUnknown: true })
                }
            },

            handler: (request, headers) => {
                try {
                    const { skip,
                        limit,
                        nome
                    } = request.query
                    
                    const query = nome ? {
                        nome: { $regex: new RegExp(nome, 'i') }
                    } : {}

                    return this.db.read(query, parseInt(skip), parseInt(limit))

                } catch (error) {
                    console.log('DEU RUIM', error)
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            options: {
                tags:['api'],
                description: 'Deve casdastrar herois',
                notes:'pode cadastar nome e poder do heroi',
                validate: {
                    failAction: 'log',
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(100)

                    }).options({ stripUnknown: true })

                }
            },
            handler: async (request)=>{
                try {
                    const {nome, poder} = request.payload
                    const result = await this.db.create({nome, poder})
                    return{
                        message:"Heroi cadastrado com sucesso!",
                        _id: result._id
                    }
                    
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return Boom.internal()
                }
            }
        }
    }
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            options: {
                tags:['api'],
                description: 'Deve atualizar heroi por id',
                notes:'pode atualizar qualquer campo',
                validate: {
                    
                    params: Joi.object({
                        id: Joi.string().required(),
                  }),//.unknown(true),
                   payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(100)

                    }).options({ stripUnknown: true })
                }
            },
            handler: async (request)=>{
                try {
                    const {
                        id
                    } = request.params;
                    const{
                        payload
                    }= request
                 const dadosString = JSON.stringify(payload)
                 const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)
                   // console.log('result',result)
                   if(result.modifiedCount !== 1){
                    return Boom.preconditionFailed ("Id não encontrado no banco!")
                }
                    return "Heroi atualizado com sucesso!"
        
                    
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return Boom.internal()
                }
            }
        }
    }
    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            options: {
                tags:['api'],
                description: 'Deve deletar heroi por id',
                notes:'pode excluir qualquer heroi',
                validate: {
                    failAction:'error',
                    params: Joi.object({
                        id: Joi.string().required(),
                  })
                    //options({ stripUnknown: true })
                }
            },
            handler: async (request)=>{
                try {
                    const {
                        id
                    } = request.params;
                    
                    const result = await this.db.delete(id)
                   // console.log('result',result)
                   if(result.deletedCount !== 1){
                    return Boom.preconditionFailed ('ID não encontrado, digite um ID válido')
                }
                    return "Heroi removido com sucesso com sucesso!"
        
                    
                } catch (error) {
                   // console.log('DEU RUIM', error)
                    return Boom.internal()
                }
            }
        }
    }
}







module.exports = HeroRoutes