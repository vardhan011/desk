import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Post()
    create(@Body() body: any) {
        return this.patientService.create(body);
    }

    @Get()
    findAll() {
        return this.patientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.patientService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.patientService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.patientService.delete(id);
    }
}
