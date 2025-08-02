import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findByUsername(username: string): Promise<User | null> {

        return this.usersRepository.findOne({ where: { username } });
    }

    async createUser(data: { username: string; passwordHash: string }): Promise<User> {
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }
}
