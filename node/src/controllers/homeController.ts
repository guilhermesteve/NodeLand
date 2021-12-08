import {Request, Response } from 'express';
import { Product } from '../model/Product';

export const  home = (req: Request, res: Response) =>{
    let user = {
        name: 'Guilherme',
        age: 90,
    }
    res.render('pages/home', {
        tittle: 'Home',
        user,
        products: Product.getAll()
    })
}