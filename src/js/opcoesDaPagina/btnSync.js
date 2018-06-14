;(function(){
    "use strict"

    const $btnSync = $("#btnSync")

    $btnSync.on("click", function(){

        $btnSync.addClass("botaoSync--esperando")


        $.ajax({
            url: "http://ceep.herokuapp.com/cartoes/salvar",
            method: "POST",
            data: {
                usuario: "artur.adam@caelum.com.br",
                cartoes: listaCartoes
            },
            success: function(){
                $btnSync.addClass("botaoSync--sincronizado")
                $btnSync.removeClass("botaoSync--esperando")
            }
        })


    })



    $btnSync.removeClass("no-js")

})()