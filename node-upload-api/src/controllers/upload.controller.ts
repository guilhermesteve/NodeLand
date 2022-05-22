import { Response, Request } from 'express'
import sharp from 'sharp'
import { promises as fspromises } from 'fs'

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true })
}

export const uploadFiles = (req: Request, res: Response) => {
    type UploadTypes = {
        avatar: Express.Multer.File[],
        gallery: Express.Multer.File[]
    }

    const files = req.files as UploadTypes

    console.log("avatar", files.avatar)
    console.log("gallery", files.gallery)

    res.json({ pong: true })
}


export const uploadFile = async (req: Request, res: Response) => {
    const file = req.file

    if (!req.file) {
        return res.status(404).json({ error: 'Arquivo inválido' })
    }

    const filename = `${req.file.filename}.jpg`

    await sharp(req.file.path)
        .resize(500)
        .toFormat('jpeg')
        .toFile(`./public/media/${filename}`)

    await fspromises.unlink(req.file.path)

    res.json({ msg: `Arquivo ${filename} salvo com sucesso.` })
}