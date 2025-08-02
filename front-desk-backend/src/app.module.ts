import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';  // add ConfigService import
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { QueueModule } from './queue/queue.module';
import { AppointmentsModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';
import { QueueItem } from './entities/queue-item.entity';
import { Appointment } from './entities/appointment.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // make config globally available
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_NAME', 'clinic'),
        entities: [Doctor, Patient, QueueItem, Appointment, User, AuthModule],
        synchronize: true, //false in production
      }),
      inject: [ConfigService],
    }),


    DoctorModule,
    PatientModule,
    QueueModule,
    AppointmentsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
