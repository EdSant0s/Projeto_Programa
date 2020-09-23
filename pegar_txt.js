class TXT{
    constructor(txt){
        this.txt = txt
    }
}
class txt_Service{
    constructor(url){
        this.url = url
    }
    inserir(txt){
        return fetch(this.url,{
            method: "POST",
            body: JSON.stringify(txt),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            resposta => resposta.json()
        );
    }
    listar(){
        return fetch(this.url,{
            method:"GET"

        }).then(resposta => resposta.json)
    }
    atualizar(txt){
        return fetch(this.url,{
            method:"PUT",
            body: JSON.stringify(txt),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resposta => resposta.json())
    }  
}
document.getElementById("enviar_txt").onclick = function(){
    const txt_user = document.getElementById("txt").value;
    const txt = new TXT(txt_user);
    const txt_service = new txt_Service("http://localhost:3000/enviar");
    txt_service.inserir(txt).then(resposta =>{
        console.log(resposta);
        txt.value = ""
    })
}