import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export type CreateDriveInputConstructorProps = {
  brand: string
  color: string
  plate: string
}

export class CreateVehicleAllocationInput {
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

export class ValidateCreateVehicleAllocationInput {
  static validate(input: CreateVehicleAllocationInput) {
    return validateSync(input)
  }
}
