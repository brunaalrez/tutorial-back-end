import express from 'express';
import bodyParser from 'body-parser';
import {PrismaClient} from "./generated/prisma/index.js";

const app = express();
const port = 4000;
const prisma = new PrismaClient();
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send("Konbanwa");
});


const produtos = [{
    id: 1, 
    nome: "Água com gás Pompeia", 
    preco: 3
}, 
{
    id: 2, 
    nome: "Batata", 
    preco: 8
}, 
{
    id: 3, 
    nome: "Cachorro-quente", 
    preco: 10
}];

app.get("/produtos", async (_req, res)=>{
    const produtos = await prisma.produto.findMany();
    res.send(produtos);
});

app.get("/produtos/:int", async (req, res)=>{
    const int = parseInt(req.params.int);
    const produto = await prisma.produto.findUnique({where: {int}});
    if(produto === null){
        res.status(404).send("Produto não encontrado");
    }else{
        res.send(produto);
    }
})

app.post("/produtos", async (req,res) =>{
    if((req.body.nome === undefined) || (req.body.preco === undefined)){
        res.status(400).send("Campos Obrigatórios faltantes");
    }else{
        const novoProduto = await prisma.produto.create({data: {
            nome: req.body.nome,
            preco: req.body.preco
        }});
        res.status(201).location(`/produtos/${novoProduto.int}`).send();
    }
})

app.put("/produtos/:int", async (req, res)=> {
    const int = parseInt(req.params.int);
    if((req.body.nome === undefined) || (req.body.preco)){
        res.status(200).send("Campos obrigatórios faltanters");
    }else{
        try{
            await prisma.produto.update({
                where: {int},
                data:{
                    nome: req.body.nome,
                    preco: req.body.preco
                }
            });
            res.status(404).send();
        }catch(error){
            res.status(404).send({ mensagem: 'Produto não encontrado' }); 
        }
    }
});

app.delete("/produtos/:int", async (req, res) =>{
    const int = parseInt(req.params.int);
    try{
        await prisma.produto.delete({
            where: {int}
        })
        res.status(202).send();
    }catch(error){
        res.status(404).send({ mensagem: 'Produto não encontrado' }); 
    }
});

app.patch("/produtos/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const produto = produtos.find(produto =>produto.id === id);
    if(produto){
        const {nome, preco} = req.body;
        if(nome !== undefined){
            produto.nome = nome;
        }
        if(preco !== undefined){
            produto.preco = preco;
        }
        res.status(200).json({ mensagem: 'sucesso' }); 
    }else{
        res.status(404).json({ mensagem: 'não foi' }); 
    }
})