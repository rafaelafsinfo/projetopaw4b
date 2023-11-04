const divResposta = document.getElementById("divResposta");
    const btnLogin = document.getElementById("btnLogin");
    const nbrMatricula = document.getElementById("nbrMatricula");
    const txtSenha = document.getElementById("txtSenha");

    btnLogin.onclick = onclick_btnLogin;

    function onclick_btnLogin(){

        const v_matricula = nbrMatricula.value;
        const v_senha = txtSenha.value;
        const objJson = {
            matricula:v_matricula,
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
                let stringJsonAluno = JSON.stringify(objetoJson.Aluno);
                localStorage.setItem("token",objetoJson.token);
                localStorage.setItem("jsonAluno",stringJsonAluno);
                window.location= `http://localhost:5000/alunosnotas/?token=${objetoJson.token}&matricula=${nbrMatricula.value}`
            }else{
                divResposta.appendChild(document.createTextNode(objetoJson.msg))
            }
            
        }).catch((error) => {
            alert(error)
            console.error("Error:", error);
        });      
    }