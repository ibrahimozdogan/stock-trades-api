import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Max, Min } from 'class-validator';
import User from './User';

@Entity()
class Trade {
    @ObjectIdColumn()
    public objectId: ObjectID;

    @Column({
        type: 'int',
        unsigned: true,
        unique: true,
    })
    public id: number;

    @Column({
        type: 'varchar',
        length: 4,
    })
    public type: 'buy' | 'sell';

    @Column(() => User)
    public user: User;

    @Column({
        type: 'varchar',
        length: 2,
    })
    public symbol: string;

    @Column({
        type: 'int',
        unsigned: true,
    })
    @Min(10)
    @Max(30)
    public shares: number;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
    })
    @Min( 130.42)
    @Max(195.65)
    public price: number;

    @Column({
        type: 'datetime',
    })
    public timestamp: Date;
}

export default Trade;
