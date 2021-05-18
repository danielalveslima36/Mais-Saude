import {Router} from 'express';
import AuthController from '../controllers/AuthController';
import UsuarioController from '../controllers/UsuarioController';
import authMiddleware from '../middleware/AuthMiddleware';
import ValidateUser from '../middleware/validations';

const usuarioRouter = Router()

usuarioRouter.post('/auth', AuthController.authenticate)
usuarioRouter.post('/usuario',ValidateUser,UsuarioController.criarUsuario)
usuarioRouter.get('/usuario', UsuarioController.listarUsuarios)
usuarioRouter.get("/usuario/:id", authMiddleware, UsuarioController.BuscarPorId)
usuarioRouter.put('/usuario', UsuarioController.AtualizarUsuario)

export default usuarioRouter