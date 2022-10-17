import { diskStorage } from "multer";
import { extname } from 'path'

export const storageProfile = {
    storage: diskStorage({
        destination: './uploads/images/profile',
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}

export const storagePost = {
    storage: diskStorage({
        destination: './uploads/images/post',
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}