import { Router } from 'express'
import * as ApiController from '../controllers/apiController'

const router = Router();

router.get('/ping', ApiController.ping)
router.get('/random', ApiController.random)
router.get('/nome/:nome', ApiController.nome)

router.post('/frase', ApiController.createPhrase)
router.get('/frase', ApiController.listPhrase)
router.get('/frase/aleatoria', ApiController.randomPhrase)

router.get('/frase/:id', ApiController.getPhrase)
router.put('/frase/:id', ApiController.updatePhrase)
router.delete('/frase/:id', ApiController.deletePhrase)


export default router;