const TOKEN = localStorage.getItem("token");

let aux = 1
let TURMAS_JSON = {};

const divResposta = document.getElementById("divResposta");
const divFormulario = document.getElementById("divFormulario");
const divIdTurma = document.getElementById("divIdTurma");
const tblAlunos = document.getElementById("tblTurmas");


const txtIdTurma = document.getElementById("txtIdTurma");
const txtNome = document.getElementById("txtNome");
const txtAbreviacao = document.getElementById("txtAbreviacao");
const txtAno = document.getElementById("txtAno");


const btnNovo = document.getElementById("btnNew");
const btnNovoupdate = document.getElementById("btnNewUpdate");
const btnCadastrar = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnCancelar = document.getElementById("btnCancelar");

btnCadastrar.onclick = btnCreate_onclick;
btnNovo.onclick = btnNovo_onclick;
btnCancelar.onclick = btnCancelar_onclick;
btnNovoupdate.onclick = btnNewUpdate_onclick;
btnUpdate.onclick = btnUpdate_onclick

/*--------------------------------------------------------------------------------------------------------------------*/
  
window.onload = function () {
    esconderFormulario();
    fetch_turmas_get();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnNovo_onclick() {
    limparFormulario();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnCancelar_onclick() {
    esconderFormulario();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnCreate_onclick() {
    if (validarFormulario_post() == true) {
        fetch_turmas_post();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnNewUpdate_onclick() {
    limparFormulariocadastro()
}

/*--------------------------------------------------------------------------------------------------------------------*/
function btnUpdate_onclick() {
    const id = txtIdTurma.value;
        fetch_turmas_put(id);
}
/*--------------------------------------------------------------------------------------------------------------------*/


function limparFormulariocadastro() {
    divFormulario.hidden = false;
    divIdTurma.hidden = false;
    btnNovo.hidden = true;
    btnNovoupdate.hidden = true;
    btnCadastrar.hidden = true;
    btnUpdate.hidden = false;
    btnCancelar.hidden = false;
    txtIdTurma.value = "";
    txtNome.value = "";
    txtAbreviacao.value = "";
    txtAno.value = "";
}

/*--------------------------------------------------------------------------------------------------------------------*/

function esconderFormulario() {

    btnNovo.hidden = false;
    btnNovoupdate.hidden = false;
    divFormulario.hidden = true;
    btnCancelar.hidden = true;
    btnCadastrar.hidden = true;
    btnUpdate.hidden = true;
}


/*--------------------------------------------------------------------------------------------------------------------*/

function limparFormulario() {
    divFormulario.hidden = false;
    divIdTurma.hidden = true;
    btnNovo.hidden = true;
    btnNovoupdate.hidden= true;
    btnCadastrar.hidden = false;
    btnUpdate.hidden = true;
    btnCancelar.hidden = false;
    txtNome.value = "";
    txtAbreviacao.value = "";
    txtAno.value = "";

}

/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblTurmas.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblTurmas.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    limparTabela();
    console.log("filtro -> "+filtro);
    const Turmas = filtro;
    for (let turma of Turmas) {

        const linha = document.createElement("tr");
        const colunaIdTurma = document.createElement("td");
        const colunaNome = document.createElement("td");
        const colunaAbreviacao = document.createElement("td");
        const colunaAno = document.createElement("td");
        const colunaExcluir = document.createElement("td");

        const btnSelecionar = document.createElement("button");
        btnSelecionar.appendChild(document.createTextNode("Selecionar"));
        btnSelecionar.onclick = function () {
            limparFormulario();
            divFormulario.hidden = false;
            btnNovo.hidden = false;
            btnCadastrar.hidden = false;
            btnUpdate.hidden = false;
            btnCancelar.hidden = false;
            txtIdTurma.value = turma.idTurma;
            txtNome.value = turma.nome;
            txtAbreviacao.value = turma.abreviacao;
            txtAno.value = turma.ano;
            
        }

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir turma: [ " + turma.idTurma + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_disciplinas_delete(turma.idTurma);
            }
        }

        colunaIdTurma.appendChild(document.createTextNode(turma.idTurma));
        colunaNome.append(document.createTextNode(turma.nome));
        colunaAbreviacao.append(document.createTextNode(turma.abreviacao));
        colunaAno.append(document.createTextNode(turma.ano));
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaIdTurma);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaAbreviacao);
        linha.appendChild(colunaAno);
        linha.appendChild(colunaExcluir);

        tblTurmas.appendChild(linha);

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function validarFormulario_post() {
    if (txtNome.value == "") {
        alert("a nome não pode ser vazia");;
        return false;
    }else if (txtAbreviacao.value == null) {
        alert("a abreviacao do professor não pode ser vazio");;
        return false;
    }else if (txtAno.value == null) {
        alert("O ano não pode ser vazio");;
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_turmas_post() {
    const jsonEnvio = {
        idTurma: txtIdTurma.value,
        nome: txtNome.value,
        abreviacao: txtAbreviacao.value,
        ano: txtAno.value
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/professores/turmas/";
    fetch(uri, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
        body: string_jsonEnvio
    }).then((response) => {
        return response.text();
    }).then((jsonResposta) => {
        console.log("RECEBIDO:", jsonResposta)
        let objetoJson = JSON.parse(jsonResposta);
        if (objetoJson.status == true) {
            fetch_turmas_get();
            limparFormulario();
            esconderFormulario();
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("erro ao criar"));
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
}

/*-----------------------------------------------------------------------------------------------------------------------*/

function fetch_turmas_get() {
    let uri = "/professores/turmas/";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((turmasJson) => {
        console.log("RECEBIDO:", turmasJson);
        const objetoJson = JSON.parse(turmasJson);
        if (objetoJson.status == true) {
            TURMAS_JSON = objetoJson.dados;
            construirTabela(TURMAS_JSON);
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

function fetch_turmas_put(idturma) {
    if (txtNome.value == "") {
        alert("nome não pode ser vazio");
    }else {
        const jsonEnvio = {
            idTurma: txtIdTurma.value,
            nome: txtNome.value,
            abreviacao: txtAbreviacao.value,
            ano: txtAno.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/professores/turmas/" + idturma;
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
        }).then((turmaJson) => {
            console.log("RECEBIDO:", turmaJson);
            const objetoJson = JSON.parse(turmaJson);
            if (objetoJson.status == true) {
                fetch_turmas_get();
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

function fetch_turmas_delete(idaluno) {
    let uri = "/professores/turmas/" + idaluno;
    fetch(uri, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => {
        return response.text();
    }).then((textoJson) => {
        console.log("RECEBIDO:", textoJson)
        let objetoJson = JSON.parse(textoJson);

        if (objetoJson.status == true) {
            fetch_turmas_get();
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