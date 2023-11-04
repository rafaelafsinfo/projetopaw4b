const params = new URLSearchParams(window.location.search)

const TOKEN = params.get('token');
console.log( 'Bearer <' + TOKEN + '>')

const matricula = params.get("matricula");

window.localStorage.setItem("matricula",matricula)
window.localStorage.setItem("token",TOKEN)

const divFormulario = document.getElementById("divFormulario");
const tblNotas = document.getElementById("tblNotas");
const tblDisciplinas = document.getElementById("tblDisciplinas");

/*--------------------------------------------------------------------------------------------------------------------*/
  

window.onload = function () {
    fetch_notas_get(matricula);
    fetch_disciplinas_get();
    
}



/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblNotas.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblNotas.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    limparTabela();
    const Notas = filtro;
    for (let notas of Notas) {

        const linha = document.createElement("tr");

        const colunaIdNota = document.createElement("td");
        const colunaidDisciplina = document.createElement("td");
        const colunaMatricula = document.createElement("td");
        const colunaBimestre = document.createElement("td");
        const colunaNota = document.createElement("td");
        const colunaUltimaAlteracao = document.createElement("td");
        const colunaTipoNota = document.createElement("td");
        const colunaFezLista = document.createElement("td");
        

        var tiponota = ""
        if(notas.tipoNota == '1'){
            tiponota = "Projeto"
        }
        else if(notas.tipoNota == '2'){
            tiponota = "Prova"
        }
        let fezLista = ""
        if(notas.fezLista == '1'){
            fezLista = "fez"
        }
        else if(notas.fezLista == '2'){
            fezLista = "não fez"
        }
        
        if (notas.nota < 6){
            linha.style.color="red"
        }
        colunaIdNota.appendChild(document.createTextNode(notas.idNota));
        colunaidDisciplina.appendChild(document.createTextNode(notas.Disciplina_idDisciplina));
        colunaMatricula.appendChild(document.createTextNode(notas.Aluno_matricula));
        colunaBimestre.appendChild(document.createTextNode(notas.bimestre));
        colunaNota.appendChild(document.createTextNode(notas.nota));
        colunaUltimaAlteracao.appendChild(document.createTextNode(notas.ultimaAlteracao));
        colunaTipoNota.appendChild(document.createTextNode(tiponota));
        colunaFezLista.appendChild(document.createTextNode(fezLista));
                


        linha.appendChild(colunaIdNota);
        linha.appendChild(colunaidDisciplina);
        linha.appendChild(colunaMatricula);
        linha.appendChild(colunaBimestre);
        linha.appendChild(colunaNota);
        linha.appendChild(colunaUltimaAlteracao);
        linha.appendChild(colunaTipoNota);
        linha.appendChild(colunaFezLista);

        tblNotas.appendChild(linha);

    }
}

/*-----------------------------------------------------------------------------------------------------------------------*/

function fetch_notas_get(matricula) {
    let uri = "/notas/"+matricula;
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((notasJson) => {
        console.log("RECEBIDO:", notasJson);
        const objetoJson = JSON.parse(notasJson);
        if (objetoJson.status == true) {
            NOTAS_JSON = objetoJson.dados;
            construirTabela(NOTAS_JSON);
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
function fetch_disciplinas_get() {
    let uri = "/professores/disciplina/";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((disciplinasJson) => {
        console.log("RECEBIDO:", disciplinasJson);
        const objetoJson = JSON.parse(disciplinasJson);
        if (objetoJson.status == true) {
            DISCIPLINAS_JSON = objetoJson.dados;
            construirTabela(DISCIPLINAS_JSON);
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

