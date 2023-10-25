//docker ps
//docker exec -it 6c7ee9cbe731 mongo -u paulolynneck -p plml@2022 --authenticationDatabase herois

// databases
// --> show dbs

// mudando o contgexto para o data bases
// --> use herois

// mostrar tables(coleçoes)

// --> show collectins

//inserindo registro na tables

/*
    db.herois.insert({
        nome: 'Flash',
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
*/

// lista todos os registro da tables
//  --> db.heroisfind()

// --> db.herois.find().pretty()

// --> db.herois.findOne()

// --> db.herois.find().limit(1000).sort({nome:-1})

// --> db.herois.find({}, {poder: 1, _id: 0})


// rodando codigo javaScript
for (let i=0; i<=100; i++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

// mostra a quantidade de registros na tables
// --> db.herois.count()

// create
db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.herois.find()

//Update
// Nao recomendado 
db.herois.update({_id: ObjectId("6522b21e43c8ac1d875ab00b")}, {nome: 'Mulher Maravilha'} )

//forma correta
db.herois.update({_id: ObjectId("6522b40343c8ac1d875ab458")}, { $set: {nome: 'Lanterna Verde}'}})

//obs: O nome da propriedade tem que esta correta, caso contrario o banco cria um novo registro

// delete
db.herois.remove({}) // remove todos os registro
db.herois.remove({nome:'Lanterna Verde'}) // remove um registro especifico
