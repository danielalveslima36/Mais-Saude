import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import { FamiliaRepository } from '../repository/FamiliaRepository';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { EnderecoRepository } from '../repository/EnderecoRepository';
import { Endereco } from '../models/Endereco';
import { PessoaRepository } from '../repository/PessoaRepository';


class FamiliaController {

    async criarFamilia(req: Request, res: Response): Promise<Response> {
        const { nome, endereco } = req.body;
        const { agente_id } = req.params;

        //Repositories
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        const familiaRepository = getCustomRepository(FamiliaRepository);
        const enderecoRepository = getCustomRepository(EnderecoRepository)

        //Verifica se o agente existe
        const usuario = await usuarioRepository.findOne({ id: agente_id });
        if (!usuario) {
            return res.status(400).json({ error: 'Agente não existe' })
        }
        try {
            //Salva o endereco e a familia
            const newEndereco = enderecoRepository.create(endereco as Endereco)
            await enderecoRepository.save(newEndereco)
            const familia = familiaRepository.create({ nome, agente_id, endereco_id: newEndereco.id })
            await familiaRepository.save(familia)
            return res.status(201).json(familia)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async listarFamiliaPorAgente(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const familiaRepository = getCustomRepository(FamiliaRepository);
        try {
            const listaFamilias = await familiaRepository.find({ agente_id: id })
            return res.status(200).json(listaFamilias);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const familiaRepository = getCustomRepository(FamiliaRepository);
        const enderecoRepository = getCustomRepository(EnderecoRepository);
        const pessoaRepository = getCustomRepository(PessoaRepository);
        try {
            const familia = await familiaRepository.findOne({ id })
            if (!familia) {
                return res.status(404).json({ error: 'Familia não encontrada' });
            }
            familia.endereco = await enderecoRepository.findOne({ id: familia.endereco_id })
            const pessoas = await pessoaRepository.find({familia_id:familia.id})
            return res.status(200).json({familia, pessoas})
        } catch (error) {

        }
    }

    async deleteFamilia(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const familiaRepository = getCustomRepository(FamiliaRepository)
        const enderecoRepository = getCustomRepository(EnderecoRepository)
        try {
            const familia = await familiaRepository.findOne({ id })
            await familiaRepository.delete({ id })
            await enderecoRepository.delete({ id: familia.endereco_id })
            return res.status(200).json({})
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

export default new FamiliaController();