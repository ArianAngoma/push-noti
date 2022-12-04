import express, {Request, Response} from 'express';

const app = express();

app.get('/test', (req: Request, res: Response) => {

    console.log(req.body)
    console.log(req.query)
    console.log(req.params)

})

app.post('/test', (req: Request, res: Response) => {

    console.log(req.body)
    console.log(req.query)
    console.log(req.params)

})

app.listen()

