import { UserEntity } from '../../domain/entities/user.entity';

export interface UserTransportDto {
  id: string;
}

export class UserMapper {
  static toDomain(dto: UserTransportDto): UserEntity {
    return new UserEntity({ id: dto.id });
  }

  static toTransport(entity: UserEntity): UserTransportDto {
    return { id: entity.props.id };
  }
}
