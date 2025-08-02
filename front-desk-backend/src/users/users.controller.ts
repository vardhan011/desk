import { Controller, Post, Body } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('create')
    async createUser(@Body() body: { username: string; password: string }) {
        const passwordHash = await bcrypt.hash(body.password, 10);
        return this.usersService.createUser({ username: body.username, passwordHash });
    }
}
