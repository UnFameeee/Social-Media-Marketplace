import { diskStorage } from "multer";
import { extname } from 'path'
import { IMAGE_LOCATION } from "./destination.config";

export const storageAvatar = {
    storage: diskStorage({
        destination: IMAGE_LOCATION.AVATAR,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}

export const storageWallpaper = {
    storage: diskStorage({
        destination: IMAGE_LOCATION.WALLPAPER,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}

export const storagePost = {
    storage: diskStorage({
        destination: IMAGE_LOCATION.POST,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}

export const storageChatroom = {
    storage: diskStorage({
        destination: IMAGE_LOCATION.CHATROOM,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}

export const storageProduct = {
    storage: diskStorage({
        destination: IMAGE_LOCATION.PRODUCT,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}