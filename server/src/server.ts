import express from 'express';
import './database/connection';
import routes from './models/routes'

const app = express();
app.use(express.json());
app.use(routes)

// request -> requisição do front end
//response -> resposta do back end



// método json para envio de objetos para ser consumida pois estamos criando API

app.listen(3333);



// GET buscar informação
// POST criando informação
// PUT editar informação
// DELETE deletar informação