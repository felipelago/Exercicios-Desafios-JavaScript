//Separe a Array agrupdando as palavras pela primeira letra de cada uma, ex: C: Chaos Legion, Call of duty em novas arrays

let games = ['Devil May Cry','Devil May Cry', 'Chaos Legion', 'RF', 'Shadow Of Colossos', 'Nier Automata', 'Mir4',
    'Dragon Ball', 'Call Of Duty']

function index() {
    let resultado = [];//Criação de uma array vazia onde será salvo o resultado
        games.map((game) => { //Utilizando map para percorrer a array e retornar uma nova array resultado, obs: vai percorrer toda a array antes de dar o return resultado
            let index = game[0]; //Criação de uma nova variável onde vai guardar a primeira letra da string da array a cada interação, ex: 1º Devil May Cry, então nessa iteração game[0] será D
            if (!resultado[index]) resultado[index] = []; //Irá criar as arrays com as iniciais das palavras sem repetir
            if (resultado[index].indexOf(game) < 0) resultado[index].push(game); //Se o item da iteração ainda não estiver em uma das array em resultado, então ele vai salvar, ex: na iteração atual
            //é a palavra Nier Automata, utilizando o indexOf que busca um item na array e retorna 1 caso encontre, se Nier Automata já existir na array criada na linha 10 com inicial N ele não entra no if, não salva e continua
        })
        return resultado
}
console.log(index())