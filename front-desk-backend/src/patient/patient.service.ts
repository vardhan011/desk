import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) { }

    create(patientData: Partial<Patient>) {
        const patient = this.patientRepository.create(patientData);
        return this.patientRepository.save(patient);
    }

    findAll() {
        return this.patientRepository.find();
    }

    findOne(id: number) {
        return this.patientRepository.findOneBy({ id });
    }

    async update(id: number, updateData: Partial<Patient>) {
        await this.patientRepository.update(id, updateData);
        return this.findOne(id);
    }

    delete(id: number) {
        return this.patientRepository.delete(id);
    }
}
