const axios = require('axios')
const URL = `https://swapi.dev/api/films/`


 async function obterPessoas(name){
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

module.exports = {obterPessoas}
  


obterPessoas('a')
.then (function (resultado){
    console.log('resultado', resultado)
})
.catch(function(error){
    console.error('DEU RUIM',error)
})
