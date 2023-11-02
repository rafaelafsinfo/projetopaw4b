const divResposta = document.getElementById("divResposta");
const btnLogin = document.getElementById("btnLogin");
const nbrMatricula = document.getElementById("nbrMatricula");
const txtSenha = document.getElementById("txtSenha");

btnLogin.onclick = onclick_btnLogin;

function onclick_btnLogin(){

    const v_matricula = nbrMatricula.value;
    const v_senha = txtSenha.value;
    const objJson = {
        email:v_matricula,
        senha:v_senha
    }
    fetch_post_verificarLogin(objJson);
}

function fetch_post_verificarLogin(objJson){
    //console.log(objJson)
    const stringJson = JSON.stringify(objJson);
    const uri = "/login/aluno";
    fetch(uri, {
        method: "post",
        body: stringJson,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':""
          }
    }).then((response) => {
        return response.text();
    }).then((jsonResposta) => {

        console.log("RECEBIDO:", jsonResposta);
        const objetoJson = JSON.parse(jsonResposta);
        //alert(objetoJson.token);
        if(objetoJson.status==true){
			let stringJsonFuncionario = JSON.stringify(objetoJson.funcionario);
            
            localStorage.setItem("token",objetoJson.token);
			localStorage.setItem("jsonFuncionario",stringJsonFuncionario);

            window.location="C:/programação/Projetos/projetopaw4b/alunos/Src/Public/Index.html"
        }else{
            divResposta.appendChild(document.createTextNode(objetoJson.msg))
        }
        
    }).catch((error) => {
        console.error("Error:", error);
    });      
}