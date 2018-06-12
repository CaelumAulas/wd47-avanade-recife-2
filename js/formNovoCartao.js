;(function(){
    const formNovoCartao = document.querySelector(".formNovoCartao")

    formNovoCartao.addEventListener("submit", function(evento){

        const conteudo = formNovoCartao.querySelector("textarea").value.trim()
        if(!conteudo){
            const tag = document.createElement("div")
            tag.textContent = "Deu ruim!"
            tag.classList.add("formNovoCartao-msg")

            formNovoCartao.appendChild(tag)
        } else {
            
        }

        evento.preventDefault()
    })

    formNovoCartao.classList.remove("no-js")
})()