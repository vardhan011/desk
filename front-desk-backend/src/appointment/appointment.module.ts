// src/appointments/appointments.module.ts

import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointment.controller';
import { AppointmentsService } from './appointment.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule], //importing the module
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService], //exporting the module
})
export class AppointmentsModule { }
