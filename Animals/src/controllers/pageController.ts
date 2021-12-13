import { Request, Response } from "express";

import { createMenuObject } from '../helpers/createMenuObject'

import { Pet } from '../models/pet'

export const home = (req: Request, res: Response) => {
    const banner = {
        title: 'Todos os animais',
        background: 'allanimals.jpg',
       
    }

    let list = Pet.getAll()

    const menu = createMenuObject('all')

    res.render('pages/page', { banner, menu, list })
}
export const dogs = (req: Request, res: Response) => {

    const banner = {
        title: 'Cachorros',
        background: 'banner_dog.jpg'
    }

    let list = Pet.getFromType('dog')

    const menu = createMenuObject('dog')

    res.render('pages/page', { banner, menu, list })
}

export const cats = (req: Request, res: Response) => {
    const banner = {
        title: 'Gatos',
        background: 'banner_cat.jpg'
    }

    let list = Pet.getFromType('cat')

    const menu = createMenuObject('cat')
    res.render('pages/page', { banner, menu, list })
}

export const fishes = (req: Request, res: Response) => {
    const banner = {
        title: 'Peixes',
        background: 'banner_fish.jpg'
    }

    let list = Pet.getFromType('fish')

    const menu = createMenuObject('fish')
    res.render('pages/page', { banner, menu, list })
}