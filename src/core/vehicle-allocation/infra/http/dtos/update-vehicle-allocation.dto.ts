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
  start_date: Date

  @IsDate()
  @IsNotEmpty()
  end_date: Date | null
}

export class UpdateVehicleDto extends UpdateVehicleInputWithoutId {}
