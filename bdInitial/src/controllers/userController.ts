import { Request, Response } from 'express';

import { User } from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if (req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const addAge = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await User.findAll({ where: { id } })

    if (result.length > 0) {
       const user = result[0]
       user.age++
       await user.save()
    }
    res.redirect('/')
}

export const minusAge = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await User.findAll({ where: { id } })

    if (result.length > 0) {
       const user = result[0]
       user.age--
       await user.save()
    }

    res.redirect('/')
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await User.findAll({ where: { id } })

    if (result.length > 0) {
       const user = result[0]
       await user.destroy()
    }

    res.redirect('/')
}

export const createUser = async (req: Request, res: Response) => {
    const { name, age } = req.body

    if (name) {
        const user = await User.create({
            name: name,
            age: age
        })
    }

    res.redirect('/')
}