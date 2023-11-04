const uri = window.location.href 
const params = new URLSearchParams(uri)

const TOKEN = params.get('token');
console.log( 'Bearer <' + TOKEN + '>')

let ALUNOS_JSON = {};

const divFormulario = document.getElementById("divFormulario");
const tblNotas = document.getElementById("tblNotas");

/*--------------------------------------------------------------------------------------------------------------------*/
  
window.onload = function () {
    fetch_notas_get(params.get('matricula'));
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
    console.log("filtro -> "+filtro);
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
        
        const colunaExcluir = document.createElement("td");

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir: [ " + notas.idNota + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_notas_delete(notas.idNota);
            }
        }

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
        
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaIdNota);
        linha.appendChild(colunaidDisciplina);
        linha.appendChild(colunaMatricula);
        linha.appendChild(colunaBimestre);
        linha.appendChild(colunaNota);
        linha.appendChild(colunaUltimaAlteracao);
        linha.appendChild(colunaTipoNota);
        linha.appendChild(colunaFezLista);
        linha.appendChild(colunaExcluir);

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

/*------------------------------------------------------------------------------------------------------------------------*/

function fetch_notas_put(idaluno) {
    if (txtIdNota.value == "") {
        alert("nome não pode ser vazio");
    } else if (txtIdDisciplina.value == "") {
        alert("senha não pode ser vazia");
    } else if (txtMatricula.value == "") {
        alert("senha não pode ser vazia");
    } else if (txtBimestre.value == "") {
        alert("senha não pode ser vazia");
    } else if (txtNota.value == "") {
        alert("senha não pode ser vazia");
    } else if (txtUltimaAlteracao.value == "") {
        alert("senha não pode ser vazia");
    } else if (txtTipoNota.value == "") {
        alert("senha não pode ser vazia");
    } else if (txtFezLista.value == "") {
        alert("senha não pode ser vazia");
    } else {
        const jsonEnvio = {
            idNota:txtIdNota.value,
            Disciplina_idDisciplina:{
                idDisciplina:txtIdDisciplina.value
            },
            Aluno_matricula:{
                matricula:txtMatricula.value
            },
            bimestre:txtBimestre.value,
            nota:txtNota.value,
            ultimaAlteracao: txtUltimaAlteracao.value,
            tipoNota:txtTipoNota.value,
            fezLista:txtFezLista.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/notas/" + idaluno;
        fetch(uri, {
            method: "PUT",
            body: string_jsonEnvio,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer <' + TOKEN + '>',
            }
        }).then((response) => {
            return response.text();
        }).then((alunoJson) => {
            console.log("RECEBIDO:", alunoJson);
            const objetoJson = JSON.parse(alunoJson);
            if (objetoJson.status == true) {
                fetch_notas_get();
                alert("Atualizado com sucesso");
                limparFormulario();
                esconderFormulario();
            } else {
                let codigo = objetoJson.codigo;
                if (codigo == 401) {
                    divResposta.append(document.createTextNode("erro ao atualizar"));
                }
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_notas_delete(idaluno) {
    let uri = "/notas/" + idaluno;
    fetch(uri, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => {
        return response.text();
    }).then((textoJsonCargos) => {
        console.log("RECEBIDO:", textoJsonCargos)
        let objetoJson = JSON.parse(textoJsonCargos);

        if (objetoJson.status == true) {
            fetch_notas_get();
            limparFormulario();
            esconderFormulario();
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("erro ao deletar"));
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
}
