import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT || 8081;

const app = express();

app.get('/test', (req: Request, res: Response) => {

    console.log(req.body)
    console.log(req.query)
    console.log(req.params)

    res.json({message: 'Hello World!'})

})

app.post('/test', (req: Request, res: Response) => {

    console.log('Push notification')

    console.log(req.body)
    console.log(req.query)
    console.log(req.params)

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

