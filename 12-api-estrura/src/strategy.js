class NotImprentedException extends Error {
    constructor(){
        super("Not Imprented Exception")     
    }
}

class ICrud {
    create(item){
        throw new NotImprentedException()
    }

    read(query){
        throw new NotImprentedException()
    }

    update(id, item){
        throw new NotImprentedException()
    }
    delete(id, item){
        throw new NotImprentedException()
    }
}

class MongoDB extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log('O item foi salvo em mongodb')
    }
}

class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log('O item foi salvo em Postgres')
    }
}

class ContextStrategy {
    constructor(strategy){
       this._database = strategy
    }
    create(item){
        return this._database.create(item)
    }
    read(item){
        return this._database.read(item)
    }
    update(id, item){
        return this._database.update(id, item)
    }
    delete(id){
        return this._database.delete(id)
    }
}

const contexMongo = new ContextStrategy(new MongoDB())
contexMongo.create()

const contexPostgres = new ContextStrategy(new Postgres())
contexPostgres.create()

contexMongo.read()
