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
    const id = parseInt(requestAnimationFrame.params.id);
    const livros = livros.find(livros =>livros.id === id);
    res.json(livros);
})