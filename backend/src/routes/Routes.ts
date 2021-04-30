import { validationResult } from 'express-validator';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import UsuarioController from '../controllers/UsuarioController';
import ValidateUser from '../middleware/validations';

const router = Router();

router.post(
    '/usuario',ValidateUser,UsuarioController.criarUsuario)
router.get('/usuario', UsuarioController.listarUsuarios)
router.get("/usuario/:id", UsuarioController.BuscarPorId)

export { router }