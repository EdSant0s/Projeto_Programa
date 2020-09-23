const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 3000;
const txt_user = [];
let key = 0;

app.post('/enviar',(req,res) =>{
    const {txt} = req.body;
    key ++;
    const user = {key,txt}
    txt_user.push(user);
    res.status(201).json(user); 
})
app.listen(port,()=>{
    console.log("app is running is port 3000")
})