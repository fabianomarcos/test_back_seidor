import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UpdateVehicleInputWithoutId {
  @IsString()
  @IsUUID()
  driver_id: string

  @IsString()
  @IsUUID()
  vehicle_id: string

  @IsString()
  @IsNotEmpty()
  reason: string

  @IsDate()
  @IsNotEmpty()
  start_date: string

  @IsDate()
  @IsNotEmpty()
  end_date: string
}

export class UpdateVehicleDto extends UpdateVehicleInputWithoutId {}
