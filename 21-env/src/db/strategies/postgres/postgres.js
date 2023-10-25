const ICrud = require ('./../interfaceS/interfaceCrud')
const Sequelize = require('sequelize')
const {config} = require('dotenv')


class Postgres extends ICrud{
    constructor(connection , schema){
        super()
        this._schema = schema
        this._conneciton = connection       
    }
    async isConnected(){
        try {
            await this._conneciton.authenticate()
            return true

        }catch(error){
            console.log( 'fail', error)
            return false;
        }
    }
   static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }

    async create(item){
        const{
            dataValues
        } = await this._schema.create(item)
       return dataValues
    }

    async update(id, item, upsert = false){
        const fn = upsert ? 'upsert' : 'update'
        return this._schema[fn](item, {
             where: { 
                id: id
            }
        })
    }

    async delete(id){
        const query = id ? {id} : {}
        return this._schema.destroy({where:query})
    }

    async read(item = {}){
        return this._schema.findAll({where: item, raw: true})
    }

    /*static async connect(){
        const connection = new Sequelize(
            process.env.DB_HOST,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            process.env.DB_NAME,

        
            {
               
               
                quoteIdentifiers: false,
                operatorsAliases:0,
                logging:false
            }
        )
          return connection
    }*/
    static async connect(){
        const connection = new Sequelize(process.env.POSTGRES_URL,
            {
            
                quoteIdentifiers: false,
                operatorsAliases:false,
                logging:false,
                ssl: process.env.SSL_DB,
                dialectOptions:{
                    ssl:process.env.SSL_DB
                }
            }
        )
          return connection
    }
}

module.exports = Postgres