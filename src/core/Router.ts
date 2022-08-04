import * as Routes from '@routes';
import express from 'express';

const Router = express.Router();

// Initialize routes
Object.values(Routes).forEach(route => route(Router));


export default Router;
