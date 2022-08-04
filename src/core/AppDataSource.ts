import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { EnvironmentEnums } from '@enums';
import * as Tables from '@entities';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = EnvironmentEnums;

const AppDataSource = new DataSource({
    type: 'mongodb',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_NAME,
    entities: [
        ...Object.values(Tables),
    ],
    synchronize: true,
    logging: 'all',
    logger: 'file',
    cache: {
        duration: 100,
    },
});


export default AppDataSource;
