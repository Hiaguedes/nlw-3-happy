import express from 'express';
import './database/connection';

const app = express();

// request -> requisição do front end
//response -> resposta do back end

app.get('/users/:id', (request, response) => {

    return response.json({message : 'Olá',function: 'query'})
});

// método json para envio de objetos para ser consumida pois estamos criando API

app.listen(3333);



// GET buscar informação
// POST criando informação
// PUT editar informação
// DELETE deletar informação