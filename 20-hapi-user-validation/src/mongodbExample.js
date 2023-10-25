// npm install mongoose

const mongoose = require ('mongoose')

const url = 'mongodb://paulo:plml@localhost:27017/herois';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', console.error.bind(console,'Erro de conexão'));

db.once('open', () => console.log('database rodando!'))
//setTimeout(()=>{
   // const state = db.readyState
   // console.log('state', state)

//},2000)
/*
  0: Disconectado
  1:Conectado
  2: Conectando
  3: Disconectando
 */

const heroiSchema = new mongoose.Schema({
   nome: {
      type:String,
      required:true
   },
   poder: {
      type:String,
      required:true
   },
   insertedAt:{
      type:Date,
      default: new Date()
   }
   
})  
const model = mongoose.model('herois', heroiSchema)

async function main(){
   const resultCadratrar = await model.create({
      nome:'Batman',
      poder:'Dinheiro'

   })
   console.log('result cadastrar', resultCadratrar)

   const listItens =  await model.find()
   console.log('itens', listItens)
}
main()