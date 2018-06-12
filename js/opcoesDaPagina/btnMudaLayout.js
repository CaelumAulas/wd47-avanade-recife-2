// Criando escopo para o arquivo todo com IIFE
// Immediately Invoked Function Expression
(function(){

    const btn = document.querySelector("#btnMudaLayout")

    btn.addEventListener("click", function(){
        if(btn.innerText.trim() == 'Linhas'){
            btn.textContent = 'Blocos'
        } else {
            btn.textContent = 'Linhas'
        } 
    })

    btn.addEventListener("click", function(){
        document.querySelector(".mural").classList.toggle("mural--linha")
    })

    btn.classList.remove("no-js")
})()