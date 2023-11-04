const params = new URLSearchParams(window.location.search)

const TOKEN = localStorage.getItem('token')
console.log( 'Bearer <' + TOKEN + '>')

const matricula = localStorage.getItem('matricula')

const tblHistorico = document.getElementById("tblHistorico");

/*--------------------------------------------------------------------------------------------------------------------*/
  

window.onload = function () {
    fetch_matricula_get(matricula);
    
}



/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblHistorico.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblHistorico.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    //limparTabela();
    const Historicos = filtro;
    for (let historicos of Historicos) {

        const linha = document.createElement("tr");

        const colunaNota_idNota = document.createElement("td");
        const colunaNota = document.createElement("td");
        const colunaUltimaAlteracao = document.createElement("td");

        colunaNota_idNota.appendChild(document.createTextNode(historicos.Nota_idNota));
        colunaNota.appendChild(document.createTextNode(historicos.nota));
        colunaUltimaAlteracao.appendChild(document.createTextNode(historicos.ultimaAlteracao));



        linha.appendChild(colunaNota_idNota);
        linha.appendChild(colunaNota);
        linha.appendChild(colunaUltimaAlteracao);

        tblHistorico.appendChild(linha);
    }
}

/*-----------------------------------------------------------------------------------------------------------------------*/

function fetch_matricula_get(matricula) {
    let uri = "/historico/"+matricula;
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((historicoJson) => {
        console.log("RECEBIDO:", historicoJson);
        const objetoJson = JSON.parse(historicoJson);
        if (objetoJson.status == true) {
            HISTORICO_JSON = objetoJson.dados;
            construirTabela(HISTORICO_JSON);
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("erro ao buscar"));
            }
        }


    }).catch((error) => {
        console.error("Error:", error);
    });
}