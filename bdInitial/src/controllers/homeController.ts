import { Request, Response } from 'express';

import { Op } from 'sequelize'

import { Product } from '../models/Product';
import { User } from '../models/User'

import User2 from '../models/Mongo/User';

export const home = async (req: Request, res: Response) => {


    let usuar = await User2.find({});
    console.log(usuar);

    let users = await User.findAll();



    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};




