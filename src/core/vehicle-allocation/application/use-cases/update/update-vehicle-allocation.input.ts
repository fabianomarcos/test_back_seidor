import { IsDate, IsNotEmpty, IsString, validateSync } from 'class-validator'

export type UpdateVehicleAllocationInputConstructorProps = {
  id: string
  driver_id?: string
  vehicle_id?: string
  reason?: string
  start_date?: Date
  end_date?: Date | null
}

export class UpdateVehicleAllocationInput {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  driver_id: string

  @IsString()
  @IsNotEmpty()
  vehicle_id: string

  @IsString()
  @IsNotEmpty()
  reason: string

  @IsNotEmpty()
  @IsDate()
  start_date: Date

  @IsNotEmpty()
  @IsDate()
  end_date: Date

  constructor(props?: UpdateVehicleAllocationInputConstructorProps) {
    if (!props) return
    this.id = props.id
    props.start_date && (this.start_date = props.start_date)
    props.end_date && (this.end_date = props.end_date)
    props.driver_id && (this.driver_id = props.driver_id)
    props.vehicle_id && (this.vehicle_id = props.vehicle_id)
    props.reason && (this.reason = props.reason)
  }
}

export class ValidateUpdateVehicleAllocationInput {
  static validate(input: UpdateVehicleAllocationInput) {
    return validateSync(input)
  }
}
