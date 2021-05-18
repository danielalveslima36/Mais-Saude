import "reflect-metadata";
import express from 'express';
import createConnection  from  "./database";
import usuarioRouter from "./routes/UsuarioRouter";
import familiaRouter from "./routes/FamiliaRouter";
import pessoaRouter from "./routes/PessoaRouter";

createConnection()
const app = express()
app.use(express.json());
app.use(usuarioRouter)
app.use(familiaRouter)
app.use(pessoaRouter)

export {app}