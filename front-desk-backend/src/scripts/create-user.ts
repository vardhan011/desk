import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity'; // Adjust path accordingly

async function createUser() {
    const dataSource = new DataSource({
        type: 'mysql', // or your DB type
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'clinic',
        entities: [User],
        synchronize: false,
    });

    await dataSource.initialize();

    const username = 'admin';
    const password = 'admin123';

    const passwordHash = await bcrypt.hash(password, 10);
    const userRepo = dataSource.getRepository(User);

    const user = userRepo.create({ username, passwordHash });
    await userRepo.save(user);

    console.log('User created:', user);

    await dataSource.destroy();
}

createUser().catch(console.error);
