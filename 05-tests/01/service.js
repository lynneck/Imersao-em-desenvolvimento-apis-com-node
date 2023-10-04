const {
    get 
} = require ('axios')

const URL = `https://swapi.dev/api/people/`


 async function obterPessoas(name){
    const url = `${URL}/?search=${name}&format=json`
    const result = await get(url)
   
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas (item){
    return{
        nome: item.name,
        peso: item.height
    }
}

module.exports={
    obterPessoas
}
