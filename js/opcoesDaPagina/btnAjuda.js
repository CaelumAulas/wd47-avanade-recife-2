// IIFE
;(function () {
    "use strict"

    const btn = document.querySelector("#btnAjuda")

    btn.addEventListener("click", function(){

        const instrucoes = [
            "Bem vindos ao Ceep",
            "Clique no botão 'Linhas' para mudar o layout",
            "Clique na lixeira para remover"
        ]

        for(var i = 0; i < instrucoes.length; i++){
            adicionarCartao(instrucoes[i])
        }
    })

    btn.classList.remove("no-js")
})()