const TOKEN = localStorage.getItem("token");

let aux = 1
let DISCIPLINAS_JSON = {};

const divResposta = document.getElementById("divResposta");
const divFormulario = document.getElementById("divFormulario");
const divIdDisciplina = document.getElementById("divIdDisciplina");
const tblAlunos = document.getElementById("tblDisciplinas");


const txtProfessor_registro = document.getElementById("txtProfessor_registro");
const txtTurma_idTurma = document.getElementById("txtTurma_idTurma");
const txtNome = document.getElementById("txtNome");
const txtIdDisciplina = document.getElementById("txtIdDisciplina");


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
    fetch_disciplinas_get();
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
        fetch_disciplinas_post();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnNewUpdate_onclick() {
    limparFormulariocadastro()
}

/*--------------------------------------------------------------------------------------------------------------------*/
function btnUpdate_onclick() {
    const id = txtIdDisciplina.value;
        fetch_disciplinas_put(id);
}
/*--------------------------------------------------------------------------------------------------------------------*/


function limparFormulariocadastro() {
    divFormulario.hidden = false;
    divIdDisciplina.hidden = false;
    btnNovo.hidden = true;
    btnNovoupdate.hidden = true;
    btnCadastrar.hidden = true;
    btnUpdate.hidden = false;
    btnCancelar.hidden = false;
    txtIdDisciplina.value = "";
    txtNome.value = "";
    txtProfessor_registro.value = "";
    txtTurma_idTurma.value = "";
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
    divIdDisciplina.hidden = true;
    btnNovo.hidden = true;
    btnNovoupdate.hidden= true;
    btnCadastrar.hidden = false;
    btnUpdate.hidden = true;
    btnCancelar.hidden = false;
    txtNome.value = "";
    txtProfessor_registro.value = "";
    txtTurma_idTurma.value = "";

}

/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblDisciplinas.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblDisciplinas.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    limparTabela();
    console.log("filtro -> "+filtro);
    const Disciplinas = filtro;
    for (let disciplina of Disciplinas) {

        const linha = document.createElement("tr");
        const colunaIdDisciplina = document.createElement("td");
        const colunaNome = document.createElement("td");
        const colunaNomeprof = document.createElement("td");
        const colunaProfessor_registro = document.createElement("td");
        const colunaTurma_idTurma = document.createElement("td");
        const colunaabreviacao = document.createElement("td");
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
            txtIdDisciplina.value = disciplina.idDisciplina;
            txtNome.value = disciplina.disciplina_nome;
            txtProfessor_registro.value = disciplina.prof_registro;
            txtTurma_idTurma.value = disciplina.turma_id;
            
        }

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir disciplina: [ " + disciplina.idDisciplina + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_disciplinas_delete(disciplina.idDisciplina);
            }
        }

        colunaIdDisciplina.appendChild(document.createTextNode(disciplina.idDisciplina));
        colunaNome.append(document.createTextNode(disciplina.disciplina_nome));
        colunaNomeprof.append(document.createTextNode(disciplina.prof_nome));
        colunaProfessor_registro.append(document.createTextNode(disciplina.prof_registro));
        colunaTurma_idTurma.append(document.createTextNode(disciplina.turma_id));
        colunaabreviacao.append(document.createTextNode(disciplina.turma_abreviacao));
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaIdDisciplina);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaProfessor_registro);
        linha.appendChild(colunaNomeprof);
        linha.appendChild(colunaTurma_idTurma);
        linha.appendChild(colunaabreviacao)
        linha.appendChild(colunaExcluir);

        tblDisciplinas.appendChild(linha);

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function validarFormulario_post() {
    if (txtNome.value == "") {
        alert("a nome não pode ser vazia");;
        return false;
    }else if (txtProfessor_registro.value == null) {
        alert("O registro do professor não pode ser vazio");;
        return false;
    }else if (txtTurma_idTurma.value == null) {
        alert("O id da turma não pode ser vazio");;
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_disciplinas_post() {
    const jsonEnvio = {
        nome: txtNome.value,
        Professor_registro: {
            registro: txtProfessor_registro.value
        },
        Turma_idTurma: {
            idTurma:txtTurma_idTurma.value
        }
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/professores/disciplina/";
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
            fetch_disciplinas_get();
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

/*------------------------------------------------------------------------------------------------------------------------*/

function fetch_disciplinas_put(iddisciplina) {
    if (txtNome.value == "") {
        alert("nome não pode ser vazio");
    }else {
        const jsonEnvio = {
            IdDisciplina: txtIdDisciplina.value,
            nome: txtNome.value,
            Professor_registro: {
                registro: txtProfessor_registro.value
            },
            Turma_idTurma: {
                idTurma:txtTurma_idTurma.value
            }
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/professores/disciplina/" + iddisciplina;
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
        }).then((disciplinaJson) => {
            console.log("RECEBIDO:", disciplinaJson);
            const objetoJson = JSON.parse(disciplinaJson);
            if (objetoJson.status == true) {
                fetch_disciplinas_get();
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

function fetch_disciplinas_delete(idaluno) {
    let uri = "/professores/disciplina/" + idaluno;
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
            fetch_disciplinas_get();
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
