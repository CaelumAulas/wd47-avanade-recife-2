// Módulos
// Module Pattern
// Closures e IIFE


// Compatibilidade para browsers muito antigos
// DX - Developer Experience

const adicionarCartao = (function(){
    "use strict"
    
    // Ambiente
    // Privado
    let numeroCartao = 0

    // Exportando um resultado
    // Público
    // Closure, Fechamento, Clausura
    // Exportar 
    return function (conteudo){
        
        numeroCartao = numeroCartao + 1
    
        const cartao = $(`
        <article id="cartao_${numeroCartao}" class="cartao " tabindex="0">
            <div class="opcoesDoCartao">
            <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                <svg><use xlink:href="#iconeRemover"></use></svg>
            </button>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#EBEF40" id="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" checked>
            <label for="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #EBEF40;" tabindex="0">
                Padrão
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#F05450" id="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #F05450;" tabindex="0">
                Importante
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#92C4EC" id="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #92C4EC;" tabindex="0">
                Tarefa
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#76EF40" id="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #76EF40;" tabindex="0">
                Inspiração
            </label>
            </div>
            <p class="cartao-conteudo" contenteditable tabindex="0">${conteudo}</p>
        </article>
        `)
    
        cartao
            .on("focusin", function(){
                cartao.addClass("cartao--focado")
            })
            .on("focusout", function(){
                cartao.removeClass("cartao--focado")
            })
            .on("click", ".opcoesDoCartao-remove" ,function(evento){
                cartao.addClass("cartao--some")
                cartao.on("transitionend", function remove(){
                    cartao.remove()
                })
            })
            .on("change", ".opcoesDoCartao-radioTipo", function(evento){
                const inputSelecionado = evento.target
                const cor = inputSelecionado.value
                cartao.css("background-color", cor)
            })
            .on("keydown", ".opcoesDoCartao-tipo", function(evento){
                console.log(evento.key)
                if((evento.key == "Enter" || evento.key == " ")){
                    evento.target.click()
                }
            })  

        cartao.appendTo('.mural')
    
    }
})()
