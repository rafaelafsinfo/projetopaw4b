const TOKEN = localStorage.getItem("token");
console.log( 'Bearer <' + TOKEN + '>')

let ALUNOS_JSON = {};

const divResposta = document.getElementById("divResposta");
const divFormulario = document.getElementById("divFormulario");
const tblAlunos = document.getElementById("tblAlunos");


const txtMatricula = document.getElementById("txtMatricula");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtWpp = document.getElementById("txtWpp");
const txtSenha = document.getElementById("txtSenha");
const txtFiltro = document.getElementById("txtFiltro");


const btnNovo = document.getElementById("btnNew");
const btnCadastrar = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnCancelar = document.getElementById("btnCancelar");

btnCadastrar.onclick = btnCreate_onclick;
btnNovo.onclick = btnNovo_onclick;
btnCancelar.onclick = btnCancelar_onclick;
btnUpdate.onclick = btnUpdate_onclick;
txtFiltro.onkeyup = txtFiltro_onkeyup;

/*--------------------------------------------------------------------------------------------------------------------*/
  
window.onload = function () {
    esconderFormulario();
    fetch_alunos_get();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnNovo_onclick() {
    limparFormulario();
}

/*--------------------------------------------------------------------------------------------------------------------*/
function txtFiltro_onkeyup() {
    let filtro = txtFiltro.value;
    fetch_alunos_get(filtro);
}
/*--------------------------------------------------------------------------------------------------------------------*/

function btnCancelar_onclick() {
    esconderFormulario();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnCreate_onclick() {
    if (validarFormulario_post() == true) {
        fetch_alunos_post();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnUpdate_onclick() {
    //recupera o id do funcionario selecionado para ser atualizado
    const matricula = txtMatricula.value;

    fetch_alunos_put(matricula);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function esconderFormulario() {

    btnNovo.hidden = false;
    btnUpdate.hidden = false;
    divFormulario.hidden = true;
    btnCancelar.hidden = true;
    btnCadastrar.hidden = true;
    btnUpdate.hidden = true;
}


/*--------------------------------------------------------------------------------------------------------------------*/

function limparFormulario() {
    divFormulario.hidden = false;
    btnNovo.hidden = false;
    btnCadastrar.hidden = false;
    btnUpdate.hidden = false;
    btnCancelar.hidden = false;
    txtMatricula.value = "";
    txtNome.value = "";
    txtEmail.value = "";
    txtWpp.value = "";
    txtSenha.value = "";

}

/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblAlunos.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblAlunos.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    limparTabela();
    console.log("filtro -> "+filtro);
    const Alunos = filtro;
    for (let aluno of Alunos) {

        const linha = document.createElement("tr");
        const colunaMatricula = document.createElement("td");
        const colunaNome = document.createElement("td");
        const colunaEmail = document.createElement("td");
        const colunaWpp = document.createElement("td");
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
            txtMatricula.value = aluno.matricula;
            txtNome.value = aluno.nome;
            txtEmail.value = aluno.email;
            txtWpp.value = aluno.wpp;
            txtSenha.value = aluno.senha;
            
        }

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir: [ " + aluno.nome + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_alunos_delete(aluno.matricula);
            }
        }

        colunaMatricula.appendChild(document.createTextNode(aluno.matricula));
        colunaNome.append(document.createTextNode(aluno.nome));
        colunaEmail.append(document.createTextNode(aluno.email));
        colunaWpp.append(document.createTextNode(aluno.wpp));
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaMatricula);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaEmail);
        linha.appendChild(colunaWpp);
        linha.appendChild(colunaExcluir);

        tblAlunos.appendChild(linha);

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function validarFormulario_post() {
    if (txtNome.value == "") {
        alert("O nome não pode ser vazio");
        return false;
    } else if (txtMatricula.value == null) {
        alert("a matricula não pode ser vazia");;
        return false;
    }else if (txtEmail.value == "") {
        alert("O email não pode ser vazio");;
        return false;
    }else if (txtWpp.value == null) {
        alert("O wpp não pode ser vazio");;
        return false;
    }else if (txtSenha.value == "") {
        alert("a senha não pode ser vazia");;
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_alunos_post() {
    const jsonEnvio = {
        matricula: txtMatricula.value,
        nome: txtNome.value,
        email: txtEmail.value,
        wpp: txtWpp.value,
        senha: txtSenha.value
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/professores/aluno/";
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
            fetch_alunos_get();
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

function fetch_alunos_get(filtro) {
    let uri = "/professores/aluno/"+filtro;
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((alunosJson) => {
        console.log("RECEBIDO:", alunosJson);
        const objetoJson = JSON.parse(alunosJson);
        if (objetoJson.status == true) {
            ALUNOS_JSON = objetoJson.dados;
            construirTabela(ALUNOS_JSON);
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

function fetch_alunos_put(idaluno) {
    if (txtNome.value == "") {
        alert("nome não pode ser vazio");
    } else if (txtSenha.value == "") {
        alert("senha não pode ser vazia");
    } else {
        const jsonEnvio = {
            matricula: txtMatricula.value,
            nome: txtNome.value,
            email: txtEmail.value,
            wpp: txtWpp.value,
            senha: txtSenha.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/professores/aluno/" + idaluno;
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
                fetch_alunos_get();
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

function fetch_alunos_delete(idaluno) {
    let uri = "/professores/aluno/" + idaluno;
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
            fetch_alunos_get();
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
