import { OrderEntity } from '../../domain/entities/order.entity';

export interface OrderTransportDto {
  id: string;
}

export class OrderMapper {
  static toDomain(dto: OrderTransportDto): OrderEntity {
    return new OrderEntity({ id: dto.id });
  }

  static toTransport(entity: OrderEntity): OrderTransportDto {
    return { id: entity.props.id };
  }
}
