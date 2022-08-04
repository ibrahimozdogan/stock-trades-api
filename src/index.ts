import 'module-alias/register';
import { AppDataSource } from '@core';
import app from './app';
import { EnvironmentEnums } from '@enums';

const port = EnvironmentEnums.SERVER_PORT;

AppDataSource.initialize().then(() => {
    app.listen(port);
    console.log('Data Source has been initialized!');
}).catch((err) => {
    console.error('Error during Data Source initialization', err);
});

export { app };

