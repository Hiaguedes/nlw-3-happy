import express from 'express';
import './database/connection';
import {getRepository} from 'typeorm';
import Orphanage from './models/Orphanages';

const app = express();
app.use(express.json())

// request -> requisição do front end
//response -> resposta do back end

app.post('/orphanages', async (request, response) => {
    
    const {name, latitude,longitude,about,instructions,opening_hours,open_on_weekends} =request.body; 
    
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = orphanagesRepository.create({name, latitude,longitude,about,instructions,opening_hours,open_on_weekends: Boolean(open_on_weekends)})
    await orphanagesRepository.save(orphanages);
    return response.status(201).json(orphanages)
});

// método json para envio de objetos para ser consumida pois estamos criando API

app.listen(3333);



// GET buscar informação
// POST criando informação
// PUT editar informação
// DELETE deletar informação