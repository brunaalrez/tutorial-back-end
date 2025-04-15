import express from 'express';

const app = express();

app.get("/", (req, res)=>{
    res.send("olá");
});

app.listen(4000, ()=> {
    console.log("REST API iniciada");
});