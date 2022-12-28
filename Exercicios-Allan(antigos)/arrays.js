//==>Desafio de funções e arrays<==//

let array = ['Um', 'dois', 'três', 'quatro', 'cinco', 'seis']

//retornar elemento especifico de uma array
let elementoPos = array.indexOf('Um')
if (elementoPos !== -1) {
	console.log('O elemento Um se encontra na Array')
}

//remover primeiro elemento
array.shift();

//remover ultimo
array.pop();

//remover primeiros de forma dinamica
function removerPrimeiro() {
	array.shift()
}
removerPrimeiro()
console.log('Removendo o primeiro elemento da array de forma dinamica: ' + array)

//Remover ultimos de forma dinamica
function removerUltimo() {
	array.pop()
}
removerUltimo()
console.log('Removendo o ultimo elemento da array de forma dinamica: ' + array)

//adicionar elemento a uma array
array.push('sete');

//Retornar a posição de um elemento na array
const encontrarElemento = array.findIndex((elemento) => {
	elemento.array === 'sete'
});

//Ordenar arrays numericas (DEC e CRES)
// const orderedList = array.sort((a, b) => {
// 	if (a < b) {
// 		return -1;
// 	} else if (a > b) {
// 		return 1;
// 	}
// 	return 0;
// })
array.sort()
console.log('Lista Ordenada: ' + array)

//ordenar arrays alfabeticas (DEC e CRES)


//Comparar tamanho de string dentro de array e retornar a menor e a maior de forma dinamica
const stringArray = ['Allan', 'Vinicius', 'Rane', 'Felipe']

function compararStrings(array) {
	let menorString = '';
	let maiorString = '';

	// array.map((e) => {
	//     if(menorString === '' || menorString.length > e.length){
	//         menorString = e
	//     }
	//     if(maiorString === '' || maiorString.length < e.length){
	//         maiorString = e
	//     }
	// })

	array.forEach(e => {
		if (menorString === '' || menorString.length > e.length) {
			menorString = e
		}
		if (maiorString === '' || maiorString.length < e.length) {
			maiorString = e
		}
	});
	return [
		'A menor string encontrada na Array eh -- ' + menorString,
		'A maior string encontrada na Array eh -- ' + maiorString
	]
}

console.log(compararStrings(stringArray))



//Mesclar arrays
let array2 = ['1', '2', '3', '4']
let novaArray = [];
novaArray = array;
novaArray = novaArray.concat(array2)
console.log('Nova Array concatenada questão 10:\n' + novaArray)

//Mesclar arrays com valores unicos como resultado final


//Mesclar arrays somente com resultados diferentes
// const data = [
//     {source: 'b', foo: 'bar'},
//     {source: 'd', foo: 'baz'}
// ];
// const other = ['b', 'c', 'e'];
// const defaultValue = 'someDefaultValue';

// const joined = [...data];
// other.forEach(source => {
//     if (!data.some(item => item.source === source)) {
//         joined.push({source, foo: defaultValue});
//     }
// });
// console.log(joined);

let array11 = ["1", "2", "2", "3"];
let array22 = ["2", "3", "3", "4"];
array11 = array11.concat(array22)
let arrayDif = [];
let concatenarDif = array11.forEach(e => {	
	if (arrayDif[e].indexOf(e)< 0) {
		arrayDif[e].push(e)
	}
	return arrayDif;
})
console.log('Mesclar Arrays com resultados diferentes:\n' + arrayDif)






// ======> Exemplos de formas de iterar com a array <======//
//Splice (Altera o array original)
let arraySplice = ['Nave1', 'Nave2', 'Nave3', 'Nave4']
let navesRemovidas = arraySplice.splice(1, 2) //Ele vai iniciar do index 1 e o número 2 é até onde vai remover, então vai remover Nave2 e Nave3
let navesRemovidas2 = arraySplice.splice(1, 2, 'Nave22', 'Nave33', 'Nave34') //Nesse caso ele vai remover Nave2 e Nave3 e no lugar vai colocar Nave22, Nave33 e Nave34

// => Slice (Extrai uma parte do array sem alterar o array original)
let arraySlice = ['Slice1', 'Slice2', 'Slice3', 'Slice4', 'Slice5']
let extrairElementos = arraySlice.slice(1, 3) // Vai iniciar do index 0 e vai até o 3 mas só vai remover o 1 e o 2, ou seja vai remover o Slice2 e o Slice3
//Se fosse slice(1,4) então iria remover o Slice2, Slice3 e o Slice4

// => ForEach (Uma função HOF, funções de alta classe ou seja funções que aguardam o callback e esse callback é chamado para cada elemento do Array)
/* Formato de utilização das funções HOF (ForEach, Map, Filter)
array.funcaoDeIterar(function(elementoAtual, indice, arrayCompleto)){
   <corpo da função>
}*/

// => Map (Modifica os elementos do array um a um sem alterar o array original, ou seja ele vai percorrer cada elemento, vai alterar pelo retorno e vai pegar esse novo array e retornar)
let arrayMap = ['Map1', 'Map2', 'Map3']
let upcased = arrayMap.map((nave) => {
	let upcased = nave.toUpperCase();
	return upcased;
})
//Ele vai retornar uma nova array alterando o que foi feito no corpo da função colocando todo o conteúdo para maiusculo

// => Filter (Ele filtra os elementos do array e a depender da condição que for posto no corpo da função ele salva o elemento no novo array, caso seja falsa ele não insere)
let arrayFilter = ['Filter11', 'Filter2', 'Filter3', 'Filter44']
let filtragem = arrayFilter.filter((elemento) => {
	return elemento.length >= 8
})//o retorno será filter11 e filter44

// => Find (Retorna o primeiro elemento da array com as condições postas no corpo da função)
//Utilizando a mesma função acima iria retornar apenas o Filter11 pois é o primeiro elemento que atende a condição