import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export type UpdateDriverInputConstructorProps = {
  id: string
  name?: string
}

export class UpdateDriverInput {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  name: string

  constructor(props?: UpdateDriverInputConstructorProps) {
    if (!props) return
    this.id = props.id
    props.name && (this.name = props.name)
  }
}

export class ValidateUpdateDriverInput {
  static validate(input: UpdateDriverInput) {
    return validateSync(input)
  }
}
