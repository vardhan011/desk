// src/queue/queue.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    ParseIntPipe,
    BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueueService, QueueStatus } from './queue.service';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
    constructor(private readonly queueService: QueueService) { }

    @Post()
    addPatient(
        @Body() body: { patient: Partial<{ id: number; name: string; age?: number; contact?: string }>; priority?: number },
    ) {
        return this.queueService.addPatientToQueue(body.patient, body.priority ?? 0);
    }

    @Get()
    findAll() {
        return this.queueService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.queueService.findOne(id);
    }

    @Patch(':id')
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { status: string },
    ) {
        const statusMap: Record<string, QueueStatus> = {
            waiting: 'Waiting',
            'with-doctor': 'With Doctor',
            completed: 'Completed',
        };

        const normalizedStatus = statusMap[body.status.toLowerCase()];
        if (!normalizedStatus) {
            throw new BadRequestException(
                `Invalid status value '${body.status}'. Allowed: waiting, with-doctor, completed`,
            );
        }

        return this.queueService.updateStatus(id, normalizedStatus);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.queueService.remove(id);
        return { message: `Queue item with id ${id} deleted successfully` };
    }
}
