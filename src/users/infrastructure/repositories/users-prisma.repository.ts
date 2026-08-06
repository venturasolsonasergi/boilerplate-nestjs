import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../application/repositories/user.repository.interface';

@Injectable()
export class UsersPrismaRepository implements UserRepository {
  findById(id: string): Promise<UserEntity | null> {
    return Promise.resolve(new UserEntity({ id }));
  }

  save(entity: UserEntity): Promise<void> {
    void entity;
    return Promise.resolve();
  }
}
