//fazendo uma função / poplateUFs é o nome da função
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") 

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //agora vai transformar num Json
    .then( res => res.json() )
    //aqui vai rodar a função
    .then( states => {

         //para a variável state vai entrar um estados dentro do states
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } 

       
    } )
    

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    //aqui ele pega o valor em target e coloca no select
    const ufValue = event.target.value
    //o input vai receber o valor desse index
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //fez o campo ficar vazio
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    //bloqueou o campo
    citySelect.disabled = true

    fetch(url)
    //agora vai transformar num Json
    .then( res => res.json() )
    //aqui vai rodar a função
    .then(cities => {

         //para a variável state vai entrar um estados dentro do states
        for( const city of cities ) {
                                             //colocamos'city.nome' para salvar o nome da cidade
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
       
        citySelect.disabled = false
       
    } )
    

}


//vamos utilizar essa função para localizar o atributo
document
.querySelector("select[name=uf]")
//aqui é o evento que vai acontecer / () => {} é a mesma coisa que function() {}
.addEventListener("change", getCities) 
    
//itens de coleta
//pegar todos os li's     pegamos os itens com o queryselectorall() dentro do()vai digitar o local das li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
//para cada item dentro do itemtocollect
for(const item of itemsToCollect) {
    //esse será o evento 'click', e vamos colocar a função
    item.addEventListener("click", handleSelectedItem)
}
//vai selecionar os itens naquele input escondido
const collectedItems = document.querySelector("input[name=items]")

//aqui vai ser a coleção de dados de itens, onde coloca e tira. isso é um array
let selectedItems = []

//toda vez que ele é disparado joga um evento na função
function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
    //o toggle faz a função de add ou remover
    //se existir o selected ele remove, se não ele adiciona
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim pegar os itens selecionados
    //para cada item que ele pegar no selectedItems, vai retornar true
    //para isso usa o findIndex(e aqui uma função anônima)
    const alreadySelected= selectedItems.findIndex( function(item){ 
       const itemFound = item == itemId //aqui, se o item for true vai nessa const
       return itemFound
    })
    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(function (item){
          const itemIsDifferent = item != itemId //false
          return itemIsDifferent
        })
         //o selected vai valer o valor de filtereditems
        selectedItems = filteredItems
    } else {
        //se não tiver selecionado, adicionar a seleção
        //push serve para colocar o elemento dentro da array
        selectedItems.push(itemId)

    }

    

    //atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
    
}