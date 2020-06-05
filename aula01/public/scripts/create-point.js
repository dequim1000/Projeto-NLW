/*document.querySelector("select[name=uf]").addEventListener("change", () => {
console.log("Mudei")
})*/

function populateUFS(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then (res=> res.json()).then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })//Função Anonima que esta retornado um valor
}
populateUFS()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]") //Alterar na URL

    const ufValue = event.target.value
    
    //Alterar na URL
    const indexOfSelectedState = event.target.selectedIndex 
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Limpando as cidades
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res=> res.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const items of itemsToCollect){
    items.addEventListener("click", handleSelectedItem)
}

//Variavel para mostrar os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []



function handleSelectedItem(event){
    const itemLi = event.target
    //add or remove class js para ficar selecionado
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id

    /*Verificar se existem itens selecionados, 
    
    //se sim pegar os itens selecionados

    //Se ja estiver selecionado, tirar da seleção

    //Se não estiver selecionado, adcionar a seleção

    //Atualizar os campos escondidos com os itens selecionados*/

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //Isso será TRUE ou FALSE
        return itemFound

        /*Poderia ser somente 
        item === itemId
        */
    })
    if (alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => { //Função anonima
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    }else {
        //adcionar à seleção
        selectedItems.push(itemId)
    }
    //atualizar o campo escondido
    collectedItems.value = selectedItems
}