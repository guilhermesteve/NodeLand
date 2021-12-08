import { Router, Request, Response } from 'express';

import { home } from '../controllers/homeController'

const router = Router();

router.get('/', home)


router.get('/contato', (req: Request, res: Response) => {
    res.render('pages/contato', {
        tittle: 'Contato',
    })
})


router.get('/sobre', (req: Request, res: Response) => {
    res.render('pages/sobre', {
        tittle: 'Sobre',
    })
})

router.get('/name', (req: Request, res: Response) => {
    res.render('pages/name', {
        tittle: 'nome',
    })
})

router.post('/name', (req: Request, res: Response) => {
    const { nome } = req.body
    res.render('pages/name', {
        tittle: 'name',
        name: nome
    })
})


export default router;