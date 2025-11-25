export class UniqueEntityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UniqueEntityError'
  }
}
