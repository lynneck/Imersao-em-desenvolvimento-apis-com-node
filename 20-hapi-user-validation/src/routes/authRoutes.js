const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('@hapi/boom')

// npm i jsonwobtoken
const Jwt = require ('jsonwebtoken')
const PasswordHelper = require('./../helpers/passwordHelper')

const USER = {
    username: 'xuxadasilva',
    password:'123'    

}


class AuthRoutes extends BaseRoute {
    constructor(secret, db){
        super()
        this.secret =secret
        this.db = db
    }
    longin() {
        return {
            path: '/login',
            method: 'POST',

            options: {
                auth:false,
                tags: ['api'],
                description: 'Deve obter token',
                notes: 'Faz login com user e senha do banco',
                validate: {
                    payload: Joi.object({
                        username: Joi.string().required,
                        password: Joi.string().required
                    }).options({ stripUnknown: true }),
                    failAction:'log'
                }
            },
            handler: async (request) => {
                const {username, password} = request.payload
                const [usuario] = await this.db.read({
                    username:username.toLowerCase()
                })
                if(!usuario){
                    return Boom.unauthorized('O Usuario informado não existe!')
                }
                const match = await PasswordHelper.comparePassword(password, usuario.password)

                if(!match){
                    return Boom.unauthorized('O usuario ou senha invalidos!')
                }


               // if (username.toLowerCase() !== USER.username || 
                //password !== USER.password
                //)
                //return Boom.unauthorized()

                const token = Jwt.sign({
                    username: username,
                    id: usuario.id

                }, this.secret)
                return {
                    token
                }

            }
        }
    }
}

module.exports = AuthRoutes