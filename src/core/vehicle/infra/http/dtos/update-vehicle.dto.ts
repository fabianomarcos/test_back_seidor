import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateVehicleInputWithoutId {
  @IsString()
  @IsNotEmpty()
  brand: string

  @IsString()
  @IsNotEmpty()
  plate: string

  @IsString()
  @IsNotEmpty()
  color: string
}

export class UpdateVehicleDto extends UpdateVehicleInputWithoutId {}
