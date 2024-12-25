import express, {Express, NextFunction, Request, Response} from "express";
import multer from 'multer'
import dogService from "../app/core/service/dog.service";
import cors from 'cors';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export class App {
    app: Express = express()
    upload: multer.Multer
    port = 5555

    constructor() {
        const storage = multer.memoryStorage()
        this.upload = multer({storage})
    }

    init() {
        this.app.use(cors())
        this.expressRoutes()
        this.startServer()
    }

    protected expressRoutes() {
        this.app.post('/api/upload-dog-image', this.upload.single('image'), async (req: MulterRequest, res: Response, next: NextFunction) => {
            try {
                const title = req.body.title
                const image = req.file
                if (title && image) {
                    const imageB64 = image.buffer.toString('base64')
                    await dogService.storeDogImage(title, imageB64)
                    res.status(200).json({
                        message: 'Image saved'
                    })
                } else {
                    res.status(422).json({
                        message: 'Image and title are required.'
                    })
                }
            } catch (exception: any) {
                res.status(400).json({
                    message: exception?.message,
                    stack: exception?.stack
                })
            }

        })

        this.app.post('/api/get-similar-dog-image', this.upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
            try {
                const image = req.file
                if (image) {
                    const imageB64 = image.buffer.toString('base64')
                    const results = await dogService.getSimilarDogImage(imageB64)
                    res.status(200).json({
                        message: 'Similar images',
                        data:results
                    })
                } else {
                    res.status(422).json({
                        message: 'Image is required.'
                    })
                }
            } catch (exception: any) {
                res.status(400).json({
                    message: exception?.message,
                    stack: exception?.stack
                })
            }
        })
    }

    protected startServer() {
        this.app.listen(this.port).on('listening', () => {
            console.log(`Application started at ${this.port}`)
        })
    }
}
