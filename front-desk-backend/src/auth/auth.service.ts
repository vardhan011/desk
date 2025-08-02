import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(username: string, password: string) {
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) {
            throw new BadRequestException('Username already exists.');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        return this.usersService.createUser({ username, passwordHash });
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if (!user) return null;

        const passwordValid = await bcrypt.compare(password, user.passwordHash);
        if (passwordValid) {

            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid username or password.');
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
