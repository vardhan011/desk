// src/queue/queue.service.ts
import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { QueueItem, QueueStatus } from '../entities/queue-item.entity';
import { Patient } from '../entities/patient.entity';
export type { QueueStatus } from '../entities/queue-item.entity';


@Injectable()
export class QueueService {
    constructor(
        @InjectRepository(QueueItem)
        private readonly queueRepo: Repository<QueueItem>,

        @InjectRepository(Patient)
        private readonly patientRepo: Repository<Patient>,

        private readonly dataSource: DataSource,
    ) { }

    async addPatientToQueue(
        patientData: Partial<Patient>,
        priority = 0,
    ): Promise<QueueItem> {
        if (!patientData.name || patientData.name.trim() === '') {
            throw new BadRequestException('Patient name is required');
        }

        let patient: Patient;

        if (patientData.id) {
            const foundPatient = await this.patientRepo.findOneBy({ id: patientData.id });
            if (!foundPatient) {
                throw new NotFoundException(`Patient with id ${patientData.id} not found`);
            }
            patient = foundPatient;
        } else {
            patient = this.patientRepo.create(patientData);
            await this.patientRepo.save(patient);
        }

        return this.dataSource.transaction(async (manager) => {
            const maxQueueNumberResult = await manager
                .getRepository(QueueItem)
                .createQueryBuilder('queue_item')
                .select('MAX(queue_item.queueNumber)', 'max')
                .getRawOne<{ max: number }>();

            const nextQueueNumber = (maxQueueNumberResult?.max ?? 0) + 1;

            const queueItem = manager.getRepository(QueueItem).create({
                patient,
                queueNumber: nextQueueNumber,
                status: 'Waiting',
                priority,
            });

            return manager.getRepository(QueueItem).save(queueItem);
        });
    }

    findAll(): Promise<QueueItem[]> {
        return this.queueRepo.find({
            order: { priority: 'DESC', queueNumber: 'ASC' },
        });
    }

    async findOne(id: number): Promise<QueueItem> {
        const item = await this.queueRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Queue item with id ${id} not found`);
        }
        return item;
    }

    async updateStatus(id: number, status: QueueStatus): Promise<QueueItem> {
        if (!['Waiting', 'With Doctor', 'Completed'].includes(status)) {
            throw new BadRequestException(
                `Invalid status '${status}'. Allowed: Waiting, With Doctor, Completed.`,
            );
        }
        const result = await this.queueRepo.update(id, { status });
        if (result.affected === 0) {
            throw new NotFoundException(`Queue item with id ${id} not found`);
        }
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.queueRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Queue item with id ${id} not found`);
        }
    }
}
