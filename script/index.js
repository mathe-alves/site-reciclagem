//o querySelectorAll não funciona em uma lista. só em um elemento
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", function (){
    //aqui ele vai remover a classe 'hide' do modal
    modal.classList.remove("hide") 
})

close.addEventListener("click", function (){
    //aqui ele vai add a classe hide quando apertar no X
    modal.classList.add("hide")
})