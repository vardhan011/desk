// src/queue/queue.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueItem } from '../entities/queue-item.entity';
import { Patient } from '../entities/patient.entity';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QueueItem, Patient])],
  providers: [QueueService],
  controllers: [QueueController],
  exports: [QueueService], // Export to other modules (e.g. AppointmentsModule)
})
export class QueueModule { }
