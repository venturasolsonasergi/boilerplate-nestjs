import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersPrismaRepository } from '../repositories/users-prisma.repository';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    UsersPrismaRepository,
    {
      provide: CreateUserUseCase,
      useFactory: (repository: UsersPrismaRepository) =>
        new CreateUserUseCase(repository),
      inject: [UsersPrismaRepository],
    },
  ],
})
export class UsersModule {}
