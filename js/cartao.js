// IIFE
;(function(){
    const cartoes = document.querySelectorAll(".cartao")

    for(let i = 0; i < cartoes.length; i++){
        const cartao = cartoes[i]

        // CRIAR Event Listener
        cartao.addEventListener("focusin", function(){
            cartao.classList.add("cartao--focado")
        })     
        cartao.addEventListener("focusout", function(){
            cartao.classList.remove("cartao--focado")
        })

        cartao.addEventListener("click", function(evento){
            const isBtnRemove = evento.target.classList.contains("opcoesDoCartao-remove")
            if(isBtnRemove){
                cartao.classList.add("cartao--some")
                cartao.addEventListener("transitionend", function remove(){
                    cartao.remove()
                })
            }
        })

        // Evento, funcao
        // Bubbling p/ reduzir eventListener
        // Delegação de Eventos // Event Delegation
        cartao.addEventListener("input", function(evento){
            const inputSelecionado = evento.target
            if(inputSelecionado.classList.contains("opcoesDoCartao-radioTipo")){
                const cor = inputSelecionado.value
                cartao.style.backgroundColor = cor
            }
        })

        cartao.addEventListener("keydown", function(evento){
            const isLabelTipo = evento.target.classList.contains("opcoesDoCartao-tipo")
            if(isLabelTipo && (evento.key == "Enter" || evento.key == " ")){
                evento.target.click()
            }
        })
    }
})()