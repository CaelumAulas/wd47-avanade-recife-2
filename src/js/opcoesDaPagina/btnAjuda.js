// IIFE
;(function () {
    "use strict"

    const btn = document.querySelector("#btnAjuda")

    btn.addEventListener("click", function(){         
        const xhr = new XMLHttpRequest()
        xhr.open("GET", "http://ceep.herokuapp.com/cartoes/instrucoes")

        xhr.send()

        // callback
        xhr.addEventListener("load", function(){
            const instrucoesString = xhr.response

            const instrucoesObjeto = JSON.parse(instrucoesString)
        
            const instrucoes = instrucoesObjeto.instrucoes

            for(var i = 0; i < instrucoes.length; i++){
                adicionarCartao(instrucoes[i].conteudo, instrucoes[i].cor)
            }
        })
       
    })

    btn.classList.remove("no-js")
})()






        const instrucoes = [
            {
                conteudo: "Bem vindos ao Ceep",
                cor: "#FF0000",
            },
            {
                conteudo: "Clique no botão 'Linhas' para mudar o layout",
                cor: "#00FF00",
            },
            {
                conteudo: "Clique na lixeira para remover",
                cor: "#0000FF"
            },
            {
                conteudo: "Clique na lixeira para remover",
                cor: "#0000FF"
            }
        ]