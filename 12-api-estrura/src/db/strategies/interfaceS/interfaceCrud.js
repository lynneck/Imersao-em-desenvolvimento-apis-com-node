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
    isConnected(){
        throw new NotImprentedException()
    }
    connect(){
        throw new NotImprentedException()
    }
    
}

module.exports =  ICrud