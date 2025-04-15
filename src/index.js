import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const livros = [{
    id: 1,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    anoPublicacao: 1954,
    disponivel: true
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    anoPublicacao: 1949,
    disponivel: false
  },
  {
    id: 3,
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    anoPublicacao: 1945,
    disponivel: true
}];

    app.get("/usuarios", (_req, res) =>{
        res.send(livros);
    })

    app.get("/usuarios/id:", (req, res) =>{
        const id = parseInt(req.params.id);
        const livros = livros.find(livros =>livros.id === id);
        res.json(livros);
    })

    app.post("/livros", (req, res)=>{
        const {titulo, autor, anoPublicacao, disponivel} = req.body;
        const id = livros.lenght + 1;
        livros.push({id, titulo, autor, anoPublicacao, disponivel});
        res.status(201).location(`/livros/${id}`).send();
    })

    app.put("/livros/:id", (req, res)=>{
        const id = parseInt(req.params.id);
        const livros = livros.find(livros =>livros.id === id);
        if(livros){
            const{titulo, autor, anoPublicacao, disponivel} = req.body;
            livros.titulo = titulo;
            livros.autor = autor;
            livros.anoPublicacao = anoPublicacao;
            livros.disponivel = disponivel;
            res.status(200).send();
        }else{
            res.status(404).send();
        }
    })