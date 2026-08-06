import type { UserRepository } from '../repositories/user.repository.interface';

export interface CreateUserInput {
  id: string;
}

export interface CreateUserOutput {
  id: string;
}

export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute(input: CreateUserInput): Promise<CreateUserOutput> {
    void this.repository;
    return Promise.resolve({ id: input.id });
  }
}
