import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FamiliaRepository } from "../repository/FamiliaRepository";
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

    async deletarPessoa(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const pessoaRepository = getCustomRepository(PessoaRepository);
        try {
            await pessoaRepository.delete({ id })
            return res.status(200).json({})
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async atualizarPessoa(req: Request, res: Response): Promise<Response> {
        const { id, nome, cpf, naturalidade, cartao_sus,
            data_nascimento, peso, altura, etnia, isChefe,
            tipo_sanguineo, foto, observacoes, pai,
            mae, familia_id } = req.body;
        const pessoaRepository = getCustomRepository(PessoaRepository)
        const familiaRepository = getCustomRepository(FamiliaRepository)
        try {
            const pessoa = await pessoaRepository.findOne({ id })
            const familia = await familiaRepository.findOne({id: familia_id})
            if (!pessoa) {
                return res.status(404).json({ message: 'Pessoa não encontrada' })
            }
            if (!familia) {
                return res.status(404).json({ message: 'Familia não encontrada' })
            }
            await pessoaRepository.update(pessoa.id, {
                nome, cpf, naturalidade, cartao_sus,
                data_nascimento, peso, altura, etnia, isChefe,
                tipo_sanguineo, foto, observacoes, pai,
                mae, familia_id
            })
            const pessoaAtualizada = await pessoaRepository.findOne({id})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {

        }
    }
}
export default new PessoaController()