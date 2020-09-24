const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const txts = [];
//let key = 0;
app.get ("/txt", (req, res) => {
  let nomes = []
  for (let i = 0; i < txts.lenght; i++) {
    nomes.append = txts[i];
  }
  res.json(nomes);
})

/*
[
  {
    nome:"ae",
    txt:"opa"
  },

  {
    nome:"ae2"
    txt:"eae men"
  }
]
*/


// Envia conteúdo do arquivo requisitado
app.get("/atualizar/:nome", (req, res) => {
  const nome = req.params.nome;

  for (let i = 0; i < txts.lenght; i++){
    arquivo = txts[i];
    if (arquivo.nome == nome){
      res.json(arquivo);
    } 
  }

  res.status(404).json({});
});

// Recebe txt novo a ser adicionado
app.post('/enviar', (req,res) => {
  const arquivo = req.body;
  //key ++;
  //const user = {key,txt}
  txts.push(arquivo);
  
  res.status(201).json(arquivo); 
});

app.listen(port, () => {
  console.log(`app is running is port ${port}`)
});

