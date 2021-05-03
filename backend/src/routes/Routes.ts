import { validationResult } from 'express-validator';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import UsuarioController from '../controllers/UsuarioController';
import ValidateUser from '../middleware/validations';
import FamiliaController from '../controllers/FamiliaController';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = Router();

router.post('/usuario',ValidateUser,UsuarioController.criarUsuario)
router.get('/usuario',authMiddleware, UsuarioController.listarUsuarios)
router.get("/usuario/:id", UsuarioController.BuscarPorId)

router.post('/familia/:agente_id', FamiliaController.CriarFamilia)
router.get('/familia', FamiliaController.ListarFamilias)
router.get('/familia/:id', FamiliaController.BuscarPorId)

router.post('/auth', AuthController.authenticate)

export { router }