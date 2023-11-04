const TOKEN = localStorage.getItem("token");

let aux = 1
let DISCIPLINAS_JSON = {};

const divResposta = document.getElementById("divResposta");
const divFormulario = document.getElementById("divFormulario");
const divIdRevisao = document.getElementById("divIdRevisao");
const tblRevisao = document.getElementById("tblRevisao");


const txtIdRevisao = document.getElementById("txtIdRevisao");
const txtIdNota = document.getElementById("txtIdNota");
const txtDescricao = document.getElementById("txtDescricao");
const txtstatus = document.getElementById("txtstatus");


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
    fetch_revisao_get();
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
        fetch_revisao_post();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnNewUpdate_onclick() {
    limparFormulariocadastro()
}

/*--------------------------------------------------------------------------------------------------------------------*/
function btnUpdate_onclick() {
    const id = txtIdRevisao.value;
        fetch_revisao_put(id);
}
/*--------------------------------------------------------------------------------------------------------------------*/


function limparFormulariocadastro() {
    divFormulario.hidden = false;
    divIdRevisao.hidden = false;
    btnNovo.hidden = true;
    btnNovoupdate.hidden = true;
    btnCadastrar.hidden = true;
    btnUpdate.hidden = false;
    btnCancelar.hidden = false;
    txtIdRevisao.value = "";
    txtIdNota.value = "";
    txtDescricao.value = "";
    txtstatus.value = "";
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
    divIdRevisao.hidden = true;
    btnNovo.hidden = true;
    btnNovoupdate.hidden= true;
    btnCadastrar.hidden = false;
    btnUpdate.hidden = true;
    btnCancelar.hidden = false;
    txtIdNota.value = "";
    txtDescricao.value = "";
    txtstatus.value = "";

}

/*--------------------------------------------------------------------------------------------------------------------*/

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblRevisao.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblRevisao.deleteRow(qtdLinhas);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function construirTabela(filtro) {
    limparTabela();
    console.log("filtro -> "+filtro);
    const Revisao = filtro;
    for (let revisao of Revisao) {

        const linha = document.createElement("tr");
        const colunaIdRevisao = document.createElement("td");
        const colunaNota = document.createElement("td");
        const colunaDescricao = document.createElement("td");
        const colunaStatus = document.createElement("td");
        
        const colunaExcluir = document.createElement("td");

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir disciplina: [ " + revisao.idPedidoRevisao + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_revisao_delete(revisao.idPedidoRevisao);
            }
        }

        colunaIdRevisao.appendChild(document.createTextNode(revisao.idPedidoRevisao));
        colunaNota.append(document.createTextNode(revisao.Nota_idNota));
        colunaDescricao.append(document.createTextNode(revisao.descricao));
        colunaStatus.append(document.createTextNode(revisao.status));
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaIdRevisao);
        linha.appendChild(colunaNota);
        linha.appendChild(colunaDescricao);
        linha.appendChild(colunaStatus);
        
        linha.appendChild(colunaExcluir);

        tblRevisao.appendChild(linha);

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function validarFormulario_post() {
    if (txtIdNota.value == "") {
        alert("a nota não pode ser vazia");;
        return false;
    }else if (txtDescricao.value == "") {
        alert("a descricao do professor não pode ser vazia");;
        return false;
    }else if (txtstatus.value == "") {
        alert("O status não pode ser vazio");;
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_revisao_post() {
    const jsonEnvio = {
        Nota_idNota: {
            idNota:txtIdNota.value
        },
        descricao: txtDescricao.value,
        status: txtstatus.value
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/professores/revisao/";
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
            fetch_revisao_get();
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

function fetch_revisao_get() {
    let uri = "/professores/revisao/";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((revisaoJson) => {
        console.log("RECEBIDO:", revisaoJson);
        const objetoJson = JSON.parse(revisaoJson);
        if (objetoJson.status == true) {
            REVISAO_JSON = objetoJson.dados;
            construirTabela(REVISAO_JSON);
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                alert("erro ao buscar");
            }
        }


    }).catch((error) => {
        console.error("Error:", error);
    });
}

/*------------------------------------------------------------------------------------------------------------------------*/

function fetch_revisao_put(idrevisao) {
    if (txtIdRevisao.value = ""){
        alert("o id do pedido não pode ser vazio");;
        return false;
    }
    else if (txtIdNota.value == "") {
        alert("a nota não pode ser vazia");;
        return false;
    }else if (txtDescricao.value == "") {
        alert("a descricao do professor não pode ser vazia");;
        return false;
    }else if (txtstatus.value == "") {
        alert("O status não pode ser vazio");;
        return false;
    }else {
        const jsonEnvio = {
            idPedidoRevisao: txtIdRevisao.value,
            Nota_idNota: {
                idNota:txtIdNota.value
            },
            descricao: txtDescricao.value,
            status: txtstatus.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/professores/revisao/" + idrevisao;
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
        }).then((revisaoJson) => {
            console.log("RECEBIDO:", revisaoJson);
            const objetoJson = JSON.parse(revisaoJson);
            if (objetoJson.status == true) {
                fetch_revisao_get();
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

function fetch_revisao_delete(idaluno) {
    let uri = "/professores/revisao/" + idaluno;
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
            fetch_revisao_get();
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
