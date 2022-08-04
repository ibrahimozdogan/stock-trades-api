import { FindManyOptions, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { AppDataSource } from '@core';

abstract class BaseRepository<Entity> {
    protected repository: Repository<Entity>;

    protected entity: new ()=> Entity;

    public tableName: string;

    protected constructor (entity: new ()=> Entity) {
        this.entity = entity;
        this.tableName = entity.name;
        this.repository = AppDataSource.getRepository<Entity>(entity);
    }

    public find (options?: FindManyOptions<Entity>): Promise<Entity[]> {
        return this.repository.find(options);
    }

    public async findOne (options: FindManyOptions<Entity>): Promise<Entity|null> {
        return this.repository.findOne(options);
    }

    public async insert (data: Record<string, unknown>): Promise<number> {
        const entity = Object.assign(new this.entity(), data);

        const errors = await validate(entity);

        if (errors.length > 0) {
            console.log(errors);
            return -1;
        }

        const {
            identifiers: [{ id }] = { identifier: [{ id: 0 }] },
        } = await this.tryCatch(() => this.repository.insert(entity));

        return id;
    }

    public async insertIfNotExists (data: Record<string, unknown>, options: FindManyOptions<Entity>): Promise<number> {
        const row = await this.findOne(options);

        if (row) {
            return -2;
        }

        return this.insert(data);
    }

    public async deleteAll () {
        return this.repository.clear();
    }

    private async tryCatch (callback: ()=> void): Promise<any> {
        try {
            return await callback();
        } catch (error) {
            console.log({
                type: 'DatabaseQueryError',
                message: `There is query error in database. \n The Error is below \n ${error}`,
            });

            return false;
        }
    }
}

export default BaseRepository;
