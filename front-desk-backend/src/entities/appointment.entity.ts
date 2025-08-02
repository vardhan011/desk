import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Doctor, { eager: true })
    doctor: Doctor;

    @ManyToOne(() => Patient, { eager: true })
    patient: Patient;

    @Column()
    time: string; // ISO string or time string

    @Column()
    status: string; // Booked, Completed, Cancelled
}
