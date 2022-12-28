/* 
-> Criar um objeto que contenha: nome, cidade, telefone e genero
-> Navegar no objeto retornando algum dado interno de forma dinamica
-> Mesclar objetos
-> Mesclar Objetos considerando os dados do primeiro objeto como preferencial
-> Mesclar Objetos considerando os dados do segundo objeto como preferencial
-> Mesclar objetos com dados diferentes
-> Manipular um objeto com uma função alterando o valor de uma determinada chave valor sendo passada de forma dinamica numa função
-> Criar uma função que converta array em objeto
-> Criar uma função que converta Objeto em array
-> Criar uma função que converta String pra objeto com chave de sua preferencia
-> Criar uma função que converta Objeto pra string
 */

//-> Criar um objeto que contenha: nome, cidade, telefone e genero
let pessoa = {
    nome: 'Felipe',
    cidade: 'Salvador',
    telefone: 123456789,
    genero: 'Masculino'
}
//-> Navegar no objeto retornando algum dado interno de forma dinamica
console.log(pessoa.nome);

let pessoa2 = {
    nome: 'Bianca',
    cidade: 'Salvador',
    telefone: 987654321,
    genero: 'Feminino'
}

//-> Mesclar Objetos considerando os dados do primeiro objeto como preferencial
let pessoas = pessoa2
pessoas = Object.assign(pessoas, pessoa);
console.log(pessoas);

//-> Mesclar Objetos considerando os dados do segundo objeto como preferencial
let pessoas2 = pessoa;
pessoas2 = Object.assign(pessoas2, pessoa2);
console.log('Mesclar Objetos considerando os dados do segundo objeto como preferencial', pessoas2);

//-> Mesclar objetos com dados diferentes
let pessoa3 = {
    nome3: 'Alan',
    cidade3: 'Salvador',
    telefone3: 12345678,
    genero3: 'Masculino'
}
let objetoDiferente = pessoa;
objetoDiferente = Object.assign(objetoDiferente, pessoa3);
console.log('//-> Mesclar objetos com dados diferentes', objetoDiferente);

//-> Manipular um objeto com uma função alterando o valor de uma determinada chave valor sendo passada de forma dinamica numa função
function trocaObjeto(novoNome){
    pessoa3.nome3 = novoNome
}
trocaObjeto('Felipe')
console.log('Objeto manipulado nome3:\n' + pessoa3.nome3)

//-> Criar uma função que converta array em objeto
const array = ['Felipe', 'Teste', 123]
function converterArrayObjeto() {
    const novoObjeto = Object.assign({}, array);
    console.log('//-> Criar uma função que converta array em objeto', novoObjeto);
}
converterArrayObjeto()

//-> Criar uma função que converta Objeto em array
const arrayObjeto = Object.values(pessoa2);
console.log('//-> Criar uma função que converta Objeto em array', arrayObjeto)

//-> Criar uma função que converta String pra objeto com chave de sua preferencia
let objetoN = JSON.parse('TESTE')
console.log('Criar uma função que converta String pra objeto com chave de sua preferencia ' + objetoN)

//-> Criar uma função que converta Objeto pra string
console.log(JSON.stringify(pessoa3))
