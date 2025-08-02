import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User { //create the user table
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    passwordHash: string;
}
