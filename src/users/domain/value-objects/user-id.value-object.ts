export class UserIdValueObject {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('UserId must be a non-empty string');
    }
  }
}
