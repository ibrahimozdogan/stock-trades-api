import { Column, Entity } from 'typeorm';

@Entity()
class User {
    @Column({
        type: 'int',
        unsigned: true,
    })
    public id: number;

    @Column({
        type: 'varchar',
    })
    public name: string;
}

export default User;
