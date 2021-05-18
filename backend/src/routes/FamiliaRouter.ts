import {Router} from 'express'
import FamiliaController from '../controllers/FamiliaController';

const familiaRouter = Router();


familiaRouter.post('/familia/:agente_id', FamiliaController.criarFamilia)
familiaRouter.get('/familia/agente/:id', FamiliaController.listarFamiliaPorAgente)
familiaRouter.get('/familia/:id', FamiliaController.buscarPorId)
familiaRouter.get('/familia/delete/:id', FamiliaController.deleteFamilia)
familiaRouter.put('/familia', FamiliaController.atualizarFamilia)

export default familiaRouter;