const {program} = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
const database = require('./database')

async function main(){
    program
        .version('v1')
        .option('-n, --nome [value]', "nome do Heroi")
        .option('-p, --poder [value]', "poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")
    
        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "listar todos Herois cadastrados")
        .option('-a, --atualizar [value]', "atualizar Heroi")
        .option('-r, --remover [value]', "remover Heroi")

       .parse(process.argv)

       const options = program.opts()
       const heroi = new Heroi(options)
       try {      
            if(options.cadastrar){
                delete heroi.id
                const resultado = await Database.cadastrar(heroi)
                if(!resultado){
                    console.error('Heroi não cadastrado')
               }
                console.log('Heroi cadastrado com sucesso!')
            }   
            if(options.listar){
                const resultado =  await Database.listar()
                console.log(resultado)
                return;
            } 
            
            if(options.atualizar){
                const idParaAtualizar = parseInt(options.atualizar);
                // remover todas as chaves que estiver com um andefined || null
                const dado = JSON.stringify(heroi)
                const heroiAtualizar = JSON.parse(dado)
                const resultado = await database.atualizar(idParaAtualizar, heroiAtualizar)
                if (!resultado){
                    console.error('Heroi não foi atualizado') 
                    return;
                } 
                    console.log('Herois atualizado com sucesso!')
            }
            
            if(options.remover){
                const resultado = await Database.remover(heroi.id)
                if(!resultado){
                    console.error('Não foi possível deletar o heroi')
                    return;
                }
                console.log('Heroi remonvido com sucesso')
                
            }
        } catch (error) {
            console.error('Erro interno', error)
        }
}

main()