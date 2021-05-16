import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PessoaRepository } from "../repository/PessoaRepository";

class PessoaController {
    async criarPessoa(req: Request, res: Response): Promise<Response> {
        //Dados
        const { nome, cpf, naturalidade, cartao_sus,
            data_nascimento, peso, altura, etnia, isChefe,
            tipo_sanguineo, foto, observacoes, pai,
            mae, familia_id } = req.body;
        //Repository
        const pessoaRepository = getCustomRepository(PessoaRepository)
        const pessoaExistente = await pessoaRepository.findOne({ cpf });
        //Verifica se a pessoa existe
        if (pessoaExistente) {
            return res.status(400).json({ message: "Pessoa ja cadastrada" })
        }

        const pessoa = pessoaRepository.create({
            nome,
            cpf,
            naturalidade,
            cartao_sus,
            data_nascimento,
            peso,
            altura,
            etnia,
            isChefe,
            tipo_sanguineo,
            foto,
            observacoes,
            pai,
            mae,
            familia_id
        })

        try {
            await pessoaRepository.save(pessoa)
            return res.status(201).json(pessoa)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async listarPessoas(req: Request, res: Response): Promise<Response> {
        const pessoaRepository = getCustomRepository(PessoaRepository);
        try {
            const pessoas = await pessoaRepository.find();
            return res.status(200).json(pessoas)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const pessoaRepository = getCustomRepository(PessoaRepository)
        const pessoa = await pessoaRepository.findOne({ id })
        if (!pessoa) {
            return res.status(404).json({ message: 'Pessoa não encontrada' })
        }
        return res.status(200).json(pessoa)
    }
}
export default new PessoaController()