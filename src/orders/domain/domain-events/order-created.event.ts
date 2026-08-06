export interface OrderCreatedEvent {
  name: 'OrderCreated';
  payload: {
    orderId: string;
  };
}
