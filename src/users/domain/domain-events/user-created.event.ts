export interface UserCreatedEvent {
  name: 'UserCreated';
  payload: {
    userId: string;
  };
}
