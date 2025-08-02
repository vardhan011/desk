// src/appointments/appointments.module.ts

import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointment.controller';
import { AppointmentsService } from './appointment.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule { }
