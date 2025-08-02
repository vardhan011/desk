import { Injectable, NotFoundException } from '@nestjs/common';
import { QueueService } from 'src/queue/queue.service';

export interface Appointment {
    id: number;
    patientName: string;
    doctorName: string;
    datetime: string;
}

@Injectable()
export class AppointmentsService {
    private appointments: Appointment[] = [];
    private currentId = 1;

    constructor(private readonly queueService: QueueService) { }

    findAll(): Appointment[] {
        return this.appointments;
    }

    async create(data: {
        patientName: string;
        doctorName: string;
        datetime: string;
    }): Promise<Appointment> {
        const newAppointment: Appointment = {
            id: this.currentId++,
            ...data,
        };


        this.appointments.push(newAppointment);


        await this.queueService.addPatientToQueue(
            { name: data.patientName },
            0,
        );

        return newAppointment;
    }

    remove(id: number): void {
        const index = this.appointments.findIndex((a) => a.id === id);
        if (index === -1) {
            throw new NotFoundException(`Appointment with id ${id} not found`);
        }
        this.appointments.splice(index, 1);
    }
}
