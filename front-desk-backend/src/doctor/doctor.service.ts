import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepo: Repository<Doctor>,
    ) { }

    create(doctorData: Partial<Doctor>) {
        const doctor = this.doctorRepo.create(doctorData);
        return this.doctorRepo.save(doctor);
    }

    findAll() {
        return this.doctorRepo.find();
    }

    findOne(id: number) {
        return this.doctorRepo.findOneBy({ id });
    }

    async update(id: number, updateData: Partial<Doctor>) {
        await this.doctorRepo.update(id, updateData);
        return this.findOne(id);
    }

    delete(id: number) {
        return this.doctorRepo.delete(id);
    }
}
