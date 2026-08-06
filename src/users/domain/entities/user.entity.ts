export interface UserEntityProps {
  id: string;
}

export class UserEntity {
  constructor(public readonly props: UserEntityProps) {}
}
