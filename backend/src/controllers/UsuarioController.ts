import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import bcryptjs from 'bcryptjs';
import { Usuario } from "../models/Usuario";

class UsuarioController {
    async criarUsuario(req:Request, res:Response): Promise<Response>{
        const {nome,cpf,email,senha} = req.body;
        const usuarioRepository = getCustomRepository(UsuarioRepository)
        const usuarioExistente = await usuarioRepository.findOne({email})
        if (usuarioExistente) {
            return res.status(400).json({error:'Usuario já cadastrado'})
        }
        const usuario = usuarioRepository.create({
            nome,
            cpf,
            email,
            senha
        });
        usuario.senha = bcryptjs.hashSync(usuario.senha);
        await usuarioRepository.save(usuario);
        return res.status(200).json(usuario)
    }

    async listarUsuarios(req:Request, res:Response):Promise<Response>{
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        const listaUsuario = await usuarioRepository.find();
        return res.status(200).json(listaUsuario);
    }

    async BuscarPorId(req:Request, res:Response):Promise<Response>{
        const {id} = req.params;
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        const usuario = await usuarioRepository.findOne({id});
        if (!usuario) {
            return res.status(404).json({error:"usuario não encontrado"})
        }
        return res.status(200).json(usuario)
    }
}

export default new UsuarioController()