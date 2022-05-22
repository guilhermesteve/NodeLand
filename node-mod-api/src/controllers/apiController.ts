import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import { Phrase } from '../models/Phrase'

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true })
}

export const random = (req: Request, res: Response) => {
    let nRand: number = Math.floor(Math.random() * 10)

    res.json({ number: nRand })
}

export const nome = (req: Request, res: Response) => {
    let name = req.params.nome

    res.json({ name })
}

export const createPhrase = async (req: Request, res: Response) => {
    let { author, txt } = req.body

    const newPhrase = await Phrase.create({
        author,
        txt
    })

    res.status(201)
    res.json({ id: newPhrase.id, author, txt })
}

export const listPhrase = async (req: Request, res: Response) => {

    const list = await Phrase.findAll()
    res.json({ list })
}


export const getPhrase = async (req: Request, res: Response) => {

    let { id } = req.params

    const phrase = await Phrase.findByPk(id)

    if (phrase) {
        res.json({ phrase })
        return
    }

    res.json({ error: "frase não encontrada" })
}

export const updatePhrase = async (req: Request, res: Response) => {

    let { id } = req.params
    let { author, txt } = req.body

    const phrase = await Phrase.findByPk(id)

    if (phrase) {
        phrase.author = author
        phrase.txt = txt

        await phrase.save()

        res.json({ phrase })
        return
    }

    res.json({ error: "frase não encontrada" })
}


export const deletePhrase = async (req: Request, res: Response) => {

    let { id } = req.params

    await Phrase.destroy({ where: { id } })
    res.json({ info: "frase deletada com sucesso" })
}

export const randomPhrase = async (req: Request, res: Response) => {

    const phrase = await Phrase.findOne(
        {
            order: [
                Sequelize.fn('RANDOM')
            ]
        }
    )
    res.json({ phrase })
}