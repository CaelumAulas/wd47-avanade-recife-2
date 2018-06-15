// Módulos
// Module Pattern
// Closures e IIFE


// Compatibilidade para browsers muito antigos
// DX - Developer Experience

const listaCartoes = []

const adicionarCartao = (function(){
    "use strict"
    
    $.ajax({
        url: "http://ceep.herokuapp.com/cartoes/carregar?usuario=artur.adam@caelum.com.br",
        method: "GET",
        dataType: "jsonp",
        success: function (respostaObjeto){
            const cartoes = respostaObjeto.cartoes
      
            for(var i = 0; i < cartoes.length; i++){
                adicionarCartao(cartoes[i].conteudo, cartoes[i].cor)
            }
        }
    })


    // Ambiente
    // Privado
    let numeroCartao = 0

    // Exportando um resultado
    // Público
    // Closure, Fechamento, Clausura
    // adicionarCartao
    return function (conteudo, cor = "#EBEF40"){
        const cartao = {
            conteudo:  conteudo,
            cor: cor
        }

        listaCartoes.push(cartao)
        
        numeroCartao = numeroCartao + 1
    
        const $cartao = $(`
        <article id="cartao_${numeroCartao}" class="cartao " tabindex="0" style="background-color: ${cor}">
            <div class="opcoesDoCartao">
            <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                <svg><use xlink:href="#iconeRemover"></use></svg>
            </button>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#EBEF40" id="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" ${cor == '#EBEF40' ? 'checked' : '' }>
            <label for="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #EBEF40;" tabindex="0">
                Padrão
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#F05450" id="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" ${cor == '#F05450' ? 'checked' : '' }>
            <label for="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #F05450;" tabindex="0">
                Importante
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#92C4EC" id="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" ${cor == '#92C4EC' ? 'checked' : '' }>
            <label for="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #92C4EC;" tabindex="0">
                Tarefa
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#76EF40" id="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" ${cor == '#76EF40' ? 'checked' : '' }>
            <label for="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #76EF40;" tabindex="0">
                Inspiração
            </label>
            </div>
            <p class="cartao-conteudo" contenteditable tabindex="0">${conteudo}</p>
        </article>
        `)
    
        $cartao
            .on("focusin", function(){
                $cartao.addClass("cartao--focado")
            })
            .on("focusout", function(){
                $cartao.removeClass("cartao--focado")
            })
            .on("click", ".opcoesDoCartao-remove" ,function(evento){
                $cartao.addClass("cartao--some")
                $cartao.on("transitionend", function remove(){
                    $cartao.remove()

                    const posicaoDoCartao = listaCartoes.indexOf(cartao)
                    listaCartoes.splice(posicaoDoCartao, 1)
                })
            })
            .on("change", ".opcoesDoCartao-radioTipo", function(evento){
                const inputSelecionado = evento.target
                const cor = inputSelecionado.value
                
                $cartao.css("background-color", cor)
                
                cartao.cor = cor
                
            })
            .on("input", ".cartao-conteudo", function(evento){
                const $p = evento.target

                cartao.conteudo = $p.textContent
            })
            .on("keydown", ".opcoesDoCartao-tipo", function(evento){
                console.log(evento.key)
                if((evento.key == "Enter" || evento.key == " ")){
                    evento.target.click()
                }
            })  

        $cartao.appendTo('.mural')
    
    }
})()


