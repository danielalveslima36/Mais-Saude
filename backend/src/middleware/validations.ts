import { NextFunction } from 'express';
import { body, validationResult } from "express-validator";
import {Request, Response} from 'express'

const ValidateUser = [
    body('nome').isLength({min:3}).withMessage("Nome deve conter no minimo 3 caracteres"),
    body('cpf').matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).withMessage("Cpf invalido"),
    body('email').isEmail().withMessage('Email Invalido'),
    body('senha').isLength({min:8}).withMessage('Senha deve conter no minimo 8 caracteres'),
    function(req:Request, res:Response, next:NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
        }
        next()
    }
]

export default ValidateUser