const TOKEN = localStorage.getItem("token");
console.log( 'Bearer <' + TOKEN + '>')

let PROFESSORES_JSON = {};

const divResposta = document.getElementById("divResposta");
const divFormulario = document.getElementById("divFormulario");
const tblAlunos = document.getElementById("tblProfessores");


const txtRegistro = document.getElementById("txtRegistro");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtSenha = document.getElementById("txtSenha");
const txtTipo = document.getElementById("txtTipo");


const btnNovo = document.getElementById("btnNew");
const btnCadastrar = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnCancelar = document.getElementById("btnCancelar");

btnCadastrar.onclick = btnCreate_onclick;
btnNovo.onclick = btnNovo_onclick;
btnCancelar.onclick = btnCancelar_onclick;
btnUpdate.onclick = btnUpdate_onclick;

/*--------------------------------------------------------------------------------------------------------------------*/
  
window.onload = function () {
    esconderFormulario();
    fetch_professores_get();
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
        fetch_professores_post();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnUpdate_onclick() {
    //recupera o id do funcionario selecionado para ser atualizado
    const registro = txtRegistro.value;

    fetch_professores_put(registro);
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
    txtRegistro.value = "";
    txtNome.value = "";
    txtEmail.value = "";
    txtTipo.value = "";
    txtSenha.value = "";

}

/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblProfessores.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblProfessores.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    limparTabela();
    console.log("filtro -> "+filtro);
    const Professores = filtro;
    for (let professor of Professores) {

        const linha = document.createElement("tr");
        const colunaRegistro = document.createElement("td");
        const colunaNome = document.createElement("td");
        const colunaEmail = document.createElement("td");
        const colunaTipo= document.createElement("td");
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
            txtMatricula.value = professor.registro;
            txtNome.value = professor.nome;
            txtEmail.value = professor.email;
            txtTipo.value = professor.tipo;
            
        }

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir: [ " + professor.registro + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_professores_delete(professor.registro);
            }
        }

        colunaRegistro.appendChild(document.createTextNode(professor.registro));
        colunaNome.append(document.createTextNode(professor.nome));
        colunaEmail.append(document.createTextNode(professor.email));
        colunaTipo.append(document.createTextNode(professor.tipo));
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaRegistro);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaEmail);
        linha.appendChild(colunaTipo);
        linha.appendChild(colunaExcluir);

        tblProfessores.appendChild(linha);

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function validarFormulario_post() {
    if (txtNome.value == "") {
        alert("O nome não pode ser vazio");
        return false;
    } else if (txtRegistro.value == null) {
        alert("o registro não pode ser vazia");;
        return false;
    }else if (txtEmail.value == "") {
        alert("O email não pode ser vazio");;
        return false;
    }else if (txtTipo.value == null) {
        alert("O tipo não pode ser vazio");;
        return false;
    }else if (txtSenha.value == "") {
        alert("a senha não pode ser vazia");;
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_professores_post() {
    const jsonEnvio = {
        registro: txtRegistro.value,
        nome: txtNome.value,
        email: txtEmail.value,
        tipo: txtTipo.value,
        senha: txtSenha.value
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/professores/professores/";
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
            fetch_professores_get();
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

function fetch_professores_get() {
    let uri = "/professores/professores/";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((professoresJson) => {
        console.log("RECEBIDO:", professoresJson);
        const objetoJson = JSON.parse(professoresJson);
        if (objetoJson.status == true) {
            PROFESSORES_JSON = objetoJson.dados;
            construirTabela(PROFESSORES_JSON);
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

function fetch_professores_put(idaluno) {
    if (txtNome.value == "") {
        alert("nome não pode ser vazio");
    } else if (txtSenha.value == "") {
        alert("senha não pode ser vazia");
    } else {
        const jsonEnvio = {
            registro: txtRegistro.value,
            nome: txtNome.value,
            email: txtEmail.value,
            tipo: txtTipo.value,
            senha: txtSenha.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/professores/professores/" + idaluno;
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
        }).then((professoresJson) => {
            console.log("RECEBIDO:", professoresJson);
            const objetoJson = JSON.parse(professoresJson);
            if (objetoJson.status == true) {
                fetch_professores_get();
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

function fetch_professores_delete(idprofessor) {
    let uri = "/professores/professores/" + idprofessor;
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
            fetch_professores_get();
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
