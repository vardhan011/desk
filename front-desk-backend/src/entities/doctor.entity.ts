import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Doctor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialization: string;

    @Column()
    gender: string;

    @Column()
    location: string;


    @Column('simple-json', { nullable: true })
    availableTimes: string[];


}