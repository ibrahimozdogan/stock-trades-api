import express, { Application } from 'express';
import { Router } from '@core';

const app: Application = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Added for temporary another solution will be checked later

app.use('/', Router);
app.get('/', (req, res) => { res.status(200).send('OK'); });

export default app;

