import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
    res.send('Olá');
}


export const dogs = (req: Request, res: Response) => {
    res.send('Olá');
}

export const cats = (req: Request, res: Response) => {
    res.send('Olá');
}

export const fishes = (req: Request, res: Response) => {
    res.send('Olá');
}