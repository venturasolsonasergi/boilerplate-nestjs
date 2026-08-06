import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersPrismaRepository } from '../repositories/orders-prisma.repository';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersPrismaRepository,
    {
      provide: CreateOrderUseCase,
      useFactory: (repository: OrdersPrismaRepository) =>
        new CreateOrderUseCase(repository),
      inject: [OrdersPrismaRepository],
    },
  ],
})
export class OrdersModule {}
