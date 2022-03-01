let filtro = document.querySelector(".principal__filtro");
filtro.addEventListener("input", () => { 
    
    const blocoPesquisa = document.querySelectorAll(".principal__blocoPesquisa");

    if(filtro.value.length > 0) {
        for (var i = 0; i < blocoPesquisa.length; i++) {
            let bloco = blocoPesquisa[i];
            let nome = bloco.querySelector(".principal__link").textContent;
            let expressao = new RegExp(filtro.value, "i");

            if (!expressao.test(nome)) {
                bloco.classList.add("principal__resultado--invisivel");
            } else {
                bloco.classList.remove("principal__resultado--invisivel");
            }

        }
    } else { 
        for (let i = 0; i < blocoPesquisa.length; i++) {
            let bloco = blocoPesquisa[i];
            bloco.classList.remove("principal__resultado--invisivel");
        }
    }

})