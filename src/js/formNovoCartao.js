;(function(){
    const $formNovoCartao = document.querySelector(".formNovoCartao")


    $formNovoCartao.addEventListener("submit", function(evento){
        const conteudo = $formNovoCartao.querySelector("textarea").value.trim()
        
        if(!conteudo){
            const $msgValidacao = document.createElement("div")
            $msgValidacao.textContent = "Deu ruim!"
            $msgValidacao.classList.add("formNovoCartao-msg")

            $formNovoCartao.appendChild($msgValidacao)
        } else {
           adicionarCartao(conteudo)
        }

        evento.preventDefault()
    })

    $formNovoCartao.classList.remove("no-js")
})()