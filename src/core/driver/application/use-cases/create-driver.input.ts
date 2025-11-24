import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export type CreateDriveInputConstructorProps = {
  name: string
}

export class CreateDriverInput {
  @IsString()
  @IsNotEmpty()
  name!: string

  constructor({ name }: CreateDriveInputConstructorProps) {
    if (!name) return
    this.name = name
  }
}

export class ValidateCreateDriverInput {
  static validate(input: CreateDriverInput) {
    return validateSync(input)
  }
}
