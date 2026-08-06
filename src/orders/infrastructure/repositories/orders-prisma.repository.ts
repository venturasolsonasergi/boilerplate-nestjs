import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../domain/entities/order.entity';
import type { OrderRepository } from '../../application/repositories/order.repository.interface';

@Injectable()
export class OrdersPrismaRepository implements OrderRepository {
  findById(id: string): Promise<OrderEntity | null> {
    return Promise.resolve(new OrderEntity({ id }));
  }

  save(entity: OrderEntity): Promise<void> {
    void entity;
    return Promise.resolve();
  }
}
