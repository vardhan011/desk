import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body('username') username: string, @Body('password') password: string) {
        try {
            return await this.authService.register(username, password);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        return this.authService.login(username, password);
    }
}
