import { Router } from 'express';
import multer from 'multer'

import * as UploadController from '../controllers/upload.controller';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp')
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-' + Date.now())
    },

})


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']

        cb(null, allowed.includes(file.mimetype))
    },
    limits: { fileSize: 10000000 }

})

const router = Router();

router.get('/health', UploadController.ping)

router.post('/single-upload', upload.single('file'), UploadController.uploadFile)

router.post('/multi-upload', upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 3 }
]), UploadController.uploadFiles)


export default router;