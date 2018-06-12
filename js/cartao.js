const cartoes = document.querySelectorAll(".cartao")

for(let i = 0; i < cartoes.length; i++){
    cartoes[i].addEventListener("focusin", function(){
        cartoes[i].classList.add("cartao--focado")
     })     
     cartoes[i].addEventListener("focusout", function(){
        cartoes[i].classList.remove("cartao--focado")
     })
}
