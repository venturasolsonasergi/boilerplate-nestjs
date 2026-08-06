import { UserEntity } from '../../domain/entities/user.entity';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  save(entity: UserEntity): Promise<void>;
}
