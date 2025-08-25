const express = require("express")
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello Welcome to Routes basics');
});

app.get('/status',(req,res)=>{
    res.json({ok:true})
});

app.get('/search',(req,res)=>{
    const { q = '',page = 1}=req.query;
    res.json({query: q , page: Number(page)});
});

app.get('/hello/:name',(req,res)=>{
    res.send(`Hello, ${req.params.name}`);
});

app.get('/square/:n',(req,res)=>{
    const n = Number(req.params.n);
    res.json({result : n*n});
});


app.listen(3000);