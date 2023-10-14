const mongoose = require('mongoose');
const ICrud = require('./interfaceS/interfaceCrud')

const STATUS = {
  0:' Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }
    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;

        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }
    defineModel() {
        const heroiSchema = new mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }

        })
        this._herois = mongoose.model('herois', heroiSchema)
    }
    connect() {
        const url = 'mongodb://paulo:plml@localhost:27017/herois';
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = mongoose.connection

        db.on('error', console.error.bind(console, 'Erro de conexão'));

        db.once('open', () => console.log('database rodando!'))

        this._driver = db

        this.defineModel()
    }
    create(item) {
      return this._herois.create(item)
    
    }
    read(item, skip=0, limit=10){
        //console.log('skip', skip)
       // console.log('limit', limit)
        return this._herois.find(item).skip(skip).limit(limit)
        //return this._herois.count()
    }
    update(id, item) {
        return this._herois.updateOne({_id:id}, {$set : item})
    }
    delete(id) {
        return this._herois.deleteOne({_id: id})
    }
    

}

module.exports = MongoDB