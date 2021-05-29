import express from 'express';

const app = express();
const PORT = 8080

app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>This app using Node JS, Express JS, Type Script and Mongo DB Tech stack</h1>')
})

app.listen(PORT, () => console.log(`app running on port ${PORT}`));

export default app;