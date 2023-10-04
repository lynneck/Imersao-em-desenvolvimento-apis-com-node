const service = require('./service')

Array.prototype.meuMap = function(callback){
    const novoArrayMapeado = []
    for(let indice = 0; indice <= this.length -1 ; indice++){
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado;
}

  async function main(){
    try {
        const result = await service.obterPessoas('s')
         //titulos =[]
        //result.results.forEach(function(item){
        //titulos.push(item.title)    
        //});
//const titulos = result.results.map(function (titulo){
  //      return titulo.title
    //  })
    //const titulos = result.results.map((titulo) => titulo.title)
        const titulos = result.results.meuMap(function(titulo,indice){
            return`[${indice}]${titulo.title}`
        })
    
        console.log(`titulos`, titulos)
    } catch (error) {
        console.error(`erro interno`, error)
    }
}

main()