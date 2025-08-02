import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

export type QueueStatus = 'Waiting' | 'With Doctor' | 'Completed';

@Entity()
export class QueueItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, { eager: true })
    @JoinColumn()
    patient: Patient;

    @Column()
    queueNumber: number;

    @Column()
    priority: number;

    @Column()
    status: QueueStatus;
}
