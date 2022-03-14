function buscarResultados() {

    const entrada = document.querySelector(".principal__input").value;
    const url = `https://api.github.com/orgs/${entrada}/repos?per_page=50`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        }
    }

    fetch(url, options).then(
        response => response.json()
    ).then(
        data => {mostrarResultados(data)}
    )

}


function mostrarResultados(resultados) {

    let resultadoBloco = document.querySelector(".principal__resultado");
    resultadoBloco.classList.remove("principal__resultado--invisivel");

    construirEstrutura(resultados, resultadoBloco);

}


function construirEstrutura(resultados, resultadoBloco){
 
    let novaDIV, novoA, novoH2, novoP;
    for(let i = 0; i < resultados.length; i++){ 
        novaDIV = document.createElement("div");
        novoA = document.createElement("a")
        novoH2 = document.createElement("h2");
        novoP = document.createElement("p");

        novaDIV.classList.add("principal__blocoPesquisa")
        novoA.classList.add("principal__link")
        novoH2.classList.add("principal__nomeRepositorio")
        novoP.classList.add("principal__descRepositorio")

        novoA.textContent = resultados[i].name;
        if (resultados[i].description == null) {
            novoP.textContent = "Sem descrição";
            novoP.classList.add("principal__descRepositorio--nulo");
        } else if (resultados[i].description.length <= 88){
            novoP.textContent = resultados[i].description;
        } else {
            const substr = resultados[i].description.substring(0, 80);
            novoP.textContent = `${substr}...`;
        }

        novoA.setAttribute("href", resultados[i].html_url)
        novoA.setAttribute("target", "_blank")

        novoH2.appendChild(novoA);
        novaDIV.appendChild(novoH2);
        novaDIV.appendChild(novoP);
        resultadoBloco.appendChild(novaDIV);
    }

}


function removeElementosAnteriores() {
    let eliminados = document.querySelectorAll(".principal__blocoPesquisa");
    eliminados.forEach(eliminado => {
        eliminado.remove();
    })
}

const botao = document.querySelector(".principal__botao");
botao.addEventListener("click", (event) => {
    removeElementosAnteriores();
    buscarResultados();

})