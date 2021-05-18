import { Usuario1619733646205 } from './../database/migrations/1619733646205-Usuario';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import bcryptjs from 'bcryptjs';
import { Usuario } from "../models/Usuario";

class UsuarioController {
    async criarUsuario(req: Request, res: Response): Promise<Response> {
        const { nome, cpf, email, senha } = req.body;
        const usuarioRepository = getCustomRepository(UsuarioRepository)
        const usuarioExistente = await usuarioRepository.findOne({ email })
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Usuario já cadastrado' })
        }
        const usuario = usuarioRepository.create({
            nome,
            cpf,
            email,
            senha
        });
        usuario.senha = bcryptjs.hashSync(usuario.senha);
        await usuarioRepository.save(usuario);
        return res.status(201).json(usuario)
    }

    async listarUsuarios(req: Request, res: Response): Promise<Response> {
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        try {
            const listaUsuario = await usuarioRepository.find();
            return res.status(200).json(listaUsuario);
        } catch (error) {
            return res.status(400).json(error);
        }

    }

    async BuscarPorId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        const usuario = await usuarioRepository.findOne({ id });
        if (!usuario) {
            return res.status(404).json({ error: "usuario não encontrado" })
        }
        return res.status(200).json(usuario)
    }

    async AtualizarUsuario(req: Request, res: Response): Promise<Response> {
        const { id, nome, cpf, email, senha } = req.body;
        const usuarioRepository = getCustomRepository(UsuarioRepository)
        try {
            const usuario = await usuarioRepository.findOne({ id })
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrado' })
            }
            await usuarioRepository.update(usuario.id, { nome, cpf, email, senha: bcryptjs.hashSync(senha) })
            const usuarioAtualizado = await usuarioRepository.findOne({id})
            return res.status(200).json(usuarioAtualizado);

        } catch (error) {
            return res.status(400).json(error);
        }
    }
}

export default new UsuarioController()