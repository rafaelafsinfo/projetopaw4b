const TOKEN = localStorage.getItem("token");
console.log( 'Bearer <' + TOKEN + '>')

let HISTORICO_JSON = {};

const divResposta = document.getElementById("divResposta");
const divFormulario = document.getElementById("divFormulario");
const tblHistorico = document.getElementById("tblHistoricos");


const txtIdNota = document.getElementById("txtIdNota");
const txtNota = document.getElementById("txtNota");
const txtUltimaAlteracao = document.getElementById("txtUltimaAlteracao");


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
    fetch_Historico_get();
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
        fetch_Historico_post();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function btnUpdate_onclick() {
    const idNota = txtIdNota.value;

    fetch_Historico_put(idNota);
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
    txtIdNota.value = "";
    txtNota.value = "";
    txtUltimaAlteracao.value = "";

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
    limparTabela();
    console.log("filtro -> "+filtro);
    const Historico = filtro;
    for (let historico of Historico) {

        const linha = document.createElement("tr");
        const colunaidNota = document.createElement("td");
        const colunaNota = document.createElement("td");
        const colunaUltimaAlteracao = document.createElement("td");
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
            txtIdNota.value = historico.Nota_idNota;
            txtNota.value = historico.Nota;
            txtUltimaAlteracao.value = historico.UltimaAlteracao;
            
        }

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir: [ " + historico.Nota_idNota + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_Historico_delete(historico.Nota_idNota);
            }
        }
        colunaidNota.appendChild(document.createTextNode(historico.Nota_idNota));
        colunaNota.append(document.createTextNode(historico.nota));
        colunaUltimaAlteracao.append(document.createTextNode(historico.ultimaAlteracao));
        colunaExcluir.append(btnExcluir);
        


        linha.appendChild(colunaidNota);
        linha.appendChild(colunaNota);
        linha.appendChild(colunaUltimaAlteracao);
        linha.appendChild(colunaExcluir);

        tblHistorico.appendChild(linha);

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function validarFormulario_post() {
    if (txtNota.value == "") {
        alert("O nome não pode ser vazio");
        return false;
    } else if (txtIdNota.value == null) {
        alert("a matricula não pode ser vazia");;
        return false;
    }else if (txtUltimaAlteracao.value == "") {
        alert("O email não pode ser vazio");;
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function fetch_Historico_post() {
    const jsonEnvio = {
        Nota_idNota:{
            idNota: txtIdNota.value
        },
        nota:txtNota.value,
        ultimaAlteracao: txtUltimaAlteracao.value
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/professores/historico/";
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
            fetch_Historico_get();
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

function fetch_Historico_get() {
    let uri = "/professores/historico/";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((HistoricoJson) => {
        console.log("RECEBIDO:", HistoricoJson);
        const objetoJson = JSON.parse(HistoricoJson);
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

/*------------------------------------------------------------------------------------------------------------------------*/

function fetch_Historico_put(idhistorico) {
    if (txtNota.value == "") {
        alert("nota não pode ser vazio");
    }else {
        const jsonEnvio = {
            Nota_idNota:{
                idNota: txtIdNota.value
            },
            nota:txtNota.value,
            ultimaAlteracao: txtUltimaAlteracao.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/professores/historico/" + idhistorico;
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
        }).then((historicoJson) => {
            console.log("RECEBIDO:", historicoJson);
            const objetoJson = JSON.parse(historicoJson);
            if (objetoJson.status == true) {
                fetch_Historico_get();
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

function fetch_Historico_delete(idhistorico) {
    let uri = "/professores/historico/" + idhistorico;
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
        console.log(objetoJson)
        if (objetoJson.status == true) {
            fetch_Historico_get();
            limparFormulario();
            esconderFormulario();
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                alert("erro ao deletar");
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
}
