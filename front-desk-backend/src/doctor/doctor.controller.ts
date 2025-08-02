import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) { }

    @Post()
    create(@Body() body: any) {
        return this.doctorService.create(body);
    }

    @Get()
    findAll() {
        return this.doctorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.doctorService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.doctorService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.doctorService.delete(id);
    }
}
