import { Router } from "express";
import PessoaController from "../controllers/PessoaController";

const pessoaRouter = Router();

pessoaRouter.post('/pessoa', PessoaController.criarPessoa)
pessoaRouter.get('/pessoa', PessoaController.listarPessoas)
pessoaRouter.get('/pessoa/:id', PessoaController.buscarPorId)
pessoaRouter.get('/pessoa/delete/:id', PessoaController.deletarPessoa)
pessoaRouter.put('/pessoa', PessoaController.atualizarPessoa)

export default pessoaRouter;