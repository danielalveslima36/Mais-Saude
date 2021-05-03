import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import { FamiliaRepository } from '../repository/FamiliaRepository';
import { UsuarioRepository } from '../repository/UsuarioRepository';

class FamiliaController {
    
    async CriarFamilia(req:Request, res:Response):Promise<Response>{
        const {nome} = req.body;
        const {agente_id} = req.params;
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        const familiaRepository = getCustomRepository(FamiliaRepository);
        const usuario = await usuarioRepository.findOne({id:agente_id});
        if (!usuario) {
            return res.status(400).json({error:'Agente não existe'})
        }
        try {
            const familia = familiaRepository.create({nome, agente_id})
            await familiaRepository.save(familia)
            return res.status(201).json(familia)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async ListarFamilias(req:Request, res:Response):Promise<Response>{
        const familiaRepository = getCustomRepository(FamiliaRepository);
        try {
            const listaFamilias = await familiaRepository.find();
            return res.status(200).json(listaFamilias);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async BuscarPorId(req:Request, res:Response):Promise<Response>{
        const {id} = req.params;
        const familiaRepository = getCustomRepository(FamiliaRepository);
        const familia = await familiaRepository.findOne({id})
        if (!familia) {
            return res.status(404).json({error:'Familia não encontrada'});
        }
        return res.status(200).json(familia)
    }
}

export default new FamiliaController();