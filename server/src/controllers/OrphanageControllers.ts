import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanages';
import {Request,Response} from 'express';

export default {
    async create(request: Request,response: Response){
        const {name, latitude,longitude,about,instructions,opening_hours,open_on_weekends} =request.body; 
    
        const orphanagesRepository = getRepository(Orphanage);
    
        const orphanages = orphanagesRepository.create({name, latitude,longitude,about,instructions,opening_hours,open_on_weekends: Boolean(open_on_weekends)})
        await orphanagesRepository.save(orphanages);
        return response.status(201).json(orphanages)
    }
}