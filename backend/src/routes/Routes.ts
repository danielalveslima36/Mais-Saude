import { validationResult } from 'express-validator';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import UsuarioController from '../controllers/UsuarioController';
import ValidateUser from '../middleware/validations';
import FamiliaController from '../controllers/FamiliaController';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middleware/AuthMiddleware';
import PessoaController from '../controllers/PessoaController';

const router = Router();

router.post('/usuario',ValidateUser,UsuarioController.criarUsuario)
router.get('/usuario', UsuarioController.listarUsuarios)
router.get("/usuario/:id", authMiddleware, UsuarioController.BuscarPorId)
router.put('/usuario', UsuarioController.AtualizarUsuario)

router.post('/familia/:agente_id', FamiliaController.criarFamilia)
router.get('/familia/agente/:id', FamiliaController.listarFamiliaPorAgente)
router.get('/familia/:id', FamiliaController.buscarPorId)
router.get('/familia/delete/:id', FamiliaController.deleteFamilia)
router.put('/familia', FamiliaController.atualizarFamilia)

router.post('/pessoa', PessoaController.criarPessoa)
router.get('/pessoa', PessoaController.listarPessoas)
router.get('/pessoa/:id', PessoaController.buscarPorId)
router.get('/pessoa/delete/:id', PessoaController.deletarPessoa)
router.put('/pessoa', PessoaController.atualizarPessoa)

router.post('/auth', AuthController.authenticate)

export { router }