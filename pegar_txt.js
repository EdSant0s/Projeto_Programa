class TXT {
    constructor(nome, txt) {
        this.nome = nome
        this.txt = txt
    }
}
class TXT_put {
    constructor(txt) {
        this.txt = txt;
    }
}
class txt_Service {
    constructor(url) {
        this.url = url
    }
    inserir(nome, txt) {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(nome, txt),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            resposta => resposta.json()
        );
    }
    listar() {
        return fetch(this.url, {
            method: "GET"

        }).then(resposta => resposta.json)
    }
    atualizar(txt) {
        return fetch(this.url, {
            method: "PUT",
            body: JSON.stringify(txt),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resposta => resposta.json())
    }
}
$("#area_criar_txt").hide("fast");
$("#area_historico").hide("fast");
document.getElementById("criar_txt").onclick = function () {
    $("#area_criar_txt").show("fast");
    $("#menu_opcao").hide("fast");
    document.getElementById("enviar_txt").onclick = function () {
        const txt_user = document.getElementById("txt").value;
        const txt_nome = document.getElementById("nome_txt").value;
        if (txt_user == "" || txt_nome == "") {
            swal('digite o nome ou o seu txt', '- tente novamente -', 'error')

        } else {
            const texto = TXT(txt_user, txt_nome);
            const texto_service = new txt_Service("http://localhost:3000/enviar");
            texto_service.inserir(texto).then(resposta => {
                $("#txt").val(' ');
                $("#nome_txt").val(' ');
                $("#area_criar_txt").hide("fast");
                $("#menu_opcao").show("fast");
                console.log(resposta);

            })
        }
    }
}
document.getElementById("historico").onclick = function () {
    $("#menu_opcao").hide("fast");
    $("#area_historico").show("fast");
    $("#escolha_txt").show("fast");
    $("#look_txt").hide("fast");
    document.getElementById("voltar_historico").onclick = function () {
        $("#txt_historico").empty();
        $("#escolha_txt").hide("fast");
        $("#menu_opcao").show("fast")
    }
    const ul_txt = document.getElementById("txt_historico");
    const texto_service = new txt_Service("http://localhost:3000/atualizar/txt");
    texto_service.listar().then(resposta => {
        for (let i = 0; i <= resposta.length - 1; i++) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerText = resposta[i].nome;
            li.append(button);
            ul_txt.append(li);
            button.onclick = function () {
                $("#escolha_txt").hide("fast");
                $("#look_txt").show("fast");
                const nome_txt = button.textContent();
                const text_service = new txt_Service(`http://localhost:3000/atualizar/${nome_txt}`)
                text_service.listar().then(resposta => {
                    const txt = resposta.txt;
                    const txt_put = document.getElementById("txt_put").value = txt;
                    document.getElementById("put_txt").onclick = function () {
                        const jhon_sleep = new TXT_put(txt_put);
                        const text_service = new txt_Service(`http://localhost:3000/atualizar/${nome_txt}`)
                        text_service.atualizar(jhon_sleep).then(response => {
                            console.log(response);
                            window.location.reload();
                        })
                    }
                })
                document.getElementById("cancelar_put").onclick = function () {
                    $("#txt_put").val(' ');
                    $("#look_txt").hide("fast");
                    $("#escolha_txt").show("fast");


                }
            }
        }
    })
}