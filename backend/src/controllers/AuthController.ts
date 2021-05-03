import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import { UsuarioRepository } from '../repository/UsuarioRepository';
import bcriptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../config/auth';
class AuthController {
    async authenticate(req:Request, res:Response){
        const {email, senha} = req.body;
        const authRepository = getCustomRepository(UsuarioRepository)
        const usuario = await authRepository.findOne({email});

        if (!usuario) return res.status(401);

        const isValid = bcriptjs.compareSync(senha, usuario.senha);

        if (!isValid) return res.status(401);

        const token = jwt.sign({id:usuario.id, nome:usuario.nome}, auth.jwt.secret, {expiresIn: '1d'});

        return res.json({
            usuario,
            token
        })

    }
}

export default new AuthController()