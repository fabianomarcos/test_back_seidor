import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export type UpdateVehicleInputConstructorProps = {
  id: string
  brand?: string
  plate?: string
  color?: string
}

export class UpdateVehicleInput {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  brand: string

  @IsString()
  @IsNotEmpty()
  plate: string

  @IsString()
  @IsNotEmpty()
  color: string

  constructor(props?: UpdateVehicleInputConstructorProps) {
    if (!props) return
    this.id = props.id
    props.color && (this.color = props.color)
    props.brand && (this.brand = props.brand)
    props.plate && (this.plate = props.plate)
  }
}

export class ValidateUpdateVehicleInput {
  static validate(input: UpdateVehicleInput) {
    return validateSync(input)
  }
}
