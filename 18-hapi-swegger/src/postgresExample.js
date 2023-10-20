// npm install sequelize
//npm install pg-hstore pg

const sequelize = require('sequelize')

const driver = new sequelize.Sequelize(
    'heroes',
    'paulolynneck',
    'plml@2023',
    {
        host: 'localhost',
        dialect:'postgres',
        quoteIdentifiers: false,
        operatorsAliases:0
    }
)

async function main (){
    const Herois = driver.define('herois', {
        id:{
            type: sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome:{
            type: sequelize.STRING,
            required: true
        },
        poder:{
            type: sequelize.STRING,
            required:true
        },
      //  insertedAt:{
           // type:Date,
           // default: new Date()
       //  }

    },{
        tableName: 'TB_HEROIS',
        freezeTableName:false,
        timestamps:false
    })
    await Herois.sync()
    await Herois.create ({
       nome: 'Lanterna Verde',
        poder: 'Anel'
    })

    const result =  await Herois.findAll({
        raw:true,
        //attributes: ['nome'] // obs: mostra na tela a propriedade nome
    })
    console.log('result', result)
}

main()

