const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Paulo@52535455'
const HAST = '$2b$04$OSAa7cGUwZhOvrHURt33CulJlPOxPjwO6Noy/G1tnL1YN7P9ANl6K'
describe('UserHelper test suite', function (){
    it('deve gerar um hasth a partir de uma senha', async() => {
        const result = await PasswordHelper.hashPassword(SENHA)
        //console.log('RESULT', result)
        assert.ok (result.length > 10)
    })
    it('deve comparar uma senha e seu hash', async() => {
        const result = await PasswordHelper.comparePassword(SENHA, HAST)
        //console.log('resut', result)
        assert.ok(result)
    })
})