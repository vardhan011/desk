import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppointmentsService } from './appointment.service';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Get()
    findAll() {
        return this.appointmentsService.findAll();
    }

    @Post()
    async create(@Body() body: any) {
        const { patientName, doctorName, datetime } = body;
        return await this.appointmentsService.create({ patientName, doctorName, datetime });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        this.appointmentsService.remove(id);
        return { message: `Appointment with id ${id} deleted` };
    }
}
