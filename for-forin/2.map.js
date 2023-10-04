const service = require('./service')

  async function main(){
    try {
        const result = await service.obterPessoas('a')
         //titulos =[]
        //result.results.forEach(function(item){
        //titulos.push(item.title)    
        //});
//const titulos = result.results.map(function (titulo){
  //      return titulo.title
    //  })
    const titulos = result.results.map((titulo) => titulo.title)
    
        console.log(`titulos`, titulos)
    } catch (error) {
        console.error(`erro interno`, error)
    }
}

main()