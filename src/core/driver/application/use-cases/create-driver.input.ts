import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export type CreateDriveInputConstructorProps = {
  name: string
}

export class CreateDriverInput {
  @IsString()
  @IsNotEmpty()
  name!: string

  constructor(props: CreateDriveInputConstructorProps) {
    if (!props) return
    this.name = props.name
  }
}

export class ValidateCreateDriverInput {
  static validate(input: CreateDriverInput) {
    return validateSync(input)
  }
}
