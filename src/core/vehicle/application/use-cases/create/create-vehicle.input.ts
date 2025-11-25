import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export type CreateDriveInputConstructorProps = {
  brand: string
  color: string
  plate: string
}

export class CreateVehicleInput {
  @IsString()
  @IsNotEmpty()
  brand: string

  @IsString()
  @IsNotEmpty()
  color: string

  @IsString()
  @IsNotEmpty()
  plate: string

  constructor(props: CreateDriveInputConstructorProps) {
    if (!props) return
    this.brand = props.brand
    this.color = props.color
    this.plate = props.plate
  }
}

export class ValidateCreateVehicleInput {
  static validate(input: CreateVehicleInput) {
    return validateSync(input)
  }
}
