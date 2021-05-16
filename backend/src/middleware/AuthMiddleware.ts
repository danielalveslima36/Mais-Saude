import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import auth from '../config/auth'

interface Payload{
    id:number;
    nome:string;
}

export default function authMiddleware(req:Request, res:Response, next:NextFunction) {
    const {authorization} = req.headers
    if (!authorization) {
        return res.sendStatus(401);
    }
    const token = authorization.replace('Bearer', '').trim()
    try {
        const data = jwt.verify(token, auth.jwt.secret)
        const {id, nome} = data as Payload 
        req.usuario = {id, nome};
        return next();
    } catch (error) {
        return res.sendStatus(401)
    }
}