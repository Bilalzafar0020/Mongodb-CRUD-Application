// app.js or server.js
import express from 'express';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();

import mongodb from 'mongodb';


import api1Router from './Api1/script.mjs';

const app = express();

app.use(express.json());
app.use(cors())


app.use('/', express.static(path.join(__dirname, 'Public')))


app.use('/Api1', api1Router);


const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
