const divResposta = document.getElementById("divResposta");
    const btnLogin = document.getElementById("btnLogin");
    const nbrRegistro = document.getElementById("nbrRegistro");
    const txtSenha = document.getElementById("txtSenha");

    btnLogin.onclick = onclick_btnLogin;

    function onclick_btnLogin(){

        const v_registro = nbrRegistro.value;
        const v_senha = txtSenha.value;
        const objJson = {
            registro:v_registro,
            senha:v_senha
        }
        fetch_post_verificarLogin(objJson);
    }

    function fetch_post_verificarLogin(objJson){
        //console.log(objJson)
        const stringJson = JSON.stringify(objJson);
        const uri = "http://localhost:3000/login/professor";
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
                let stringJsonProfessor = JSON.stringify(objetoJson.professor);
                
                localStorage.setItem("token",objetoJson.token);
                localStorage.setItem("jsonProfessor",stringJsonProfessor);

                window.location="http://localhost:3000/professorAluno"
            }else{
                divResposta.appendChild(document.createTextNode(objetoJson.msg))
            }
            
        }).catch((error) => {
            console.error("Error:", error);
        });      
    }