const service = require('./service')

  async function main(){
    try {
        const result = await service.obterPessoas('a')
        const titulos =[]
        console.time('for')
        for(let i = 0; i <= result.results.length-1; i++){
            const titulo = result.results[i]
            titulos.push(titulo.title)
        }
        console.timeEnd('for')
       console.time('forin')
       for(let i in result.results){
        const titulo = result.results[i]
        titulos.push(titulo.title)
       }
       console.timeEnd('forin')

       console.time('forof')
        for (titulo of result.results){
            titulos.push(titulo.title)

        }
        console.timeEnd('forof')
        console.log(`titulos`, titulos)
    } catch (error) {
        console.error(`erro interno`, error)
    }
}

main()