const Sequelize = require ('sequelize')

const HeroiSchema = {
    name:'heroi',
    schema:{
        id:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome:{
            type: Sequelize.STRING,
            required: true
        },
        poder:{
            type: Sequelize.STRING,
            required:true
        },
        
    
    },
    options:{
        tableName: 'TH_HEROIS',
        freezeTableName:false,
        timestamps:false
    }
}

module.exports = HeroiSchema